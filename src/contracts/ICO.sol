// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ICOLupeUpgradeable is
    OwnableUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable
{
    IERC20 public usdt;

    uint256 public constant TOTAL_TOKENS_FOR_SALE = 150_000_000 * 1e18;
    uint256 public constant MIN_PURCHASE = 100 * 1e6;

    uint256 public totalTokensSold;
    uint256 public totalUsdtRaised;
    uint256 public totalUsdtRaisedRemaining;
    uint256 public totalUsdtPaidToSponsors;

    mapping(address => uint256) public userUsdtSpent;
    mapping(address => uint256) public userTokensPurchased;
    mapping(address => mapping(uint256 => uint256))
        public userAmountUsdtPerLevel;
    mapping(address => mapping(uint256 => mapping(address => uint256)))
        public userAmountUsdtPerLevelPerWallet;
    mapping(address => mapping(uint256 => address[]))
        public userReferralsPerLevel;
    mapping(address => mapping(uint256 => uint256))
        public userReferralCountPerLevel;
    mapping(address => mapping(address => bool)) public referralIsInvestor;
    mapping(address => address) public referrerOf;

    event TokensPurchased(
        address indexed buyer,
        uint256 usdtAmount,
        uint256 tokensReceived,
        address indexed referrer,
        uint256 time
    );
    event ReferralRewardPaid(
        address indexed referrer,
        address indexed buyer,
        uint256 level,
        uint256 reward,
        uint256 time
    );
    event ReferrerAssigned(
        address indexed user,
        address indexed referrer,
        uint256 time
    );
    event RemainingBalanceTransferred(
        address indexed owner,
        uint256 amount,
        uint256 time
    );

    function initialize(address _usdt) public initializer {
        __Ownable_init(msg.sender);
        __Pausable_init();
        __UUPSUpgradeable_init();
        usdt = IERC20(_usdt);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function buyTokens(
        uint256 usdtAmount,
        address referrer
    ) external whenNotPaused {
        require(usdtAmount >= MIN_PURCHASE, "Minimum 100 USDT");
        require(referrer != msg.sender, "You cannot refer yourself");

        if (
            userUsdtSpent[msg.sender] == 0 &&
            referrerOf[msg.sender] == address(0) &&
            referrer != address(0)
        ) {
            referrerOf[msg.sender] = referrer;
            emit ReferrerAssigned(msg.sender, referrer, block.timestamp);
        }

        require(
            usdt.transferFrom(msg.sender, address(this), usdtAmount),
            "USDT transfer failed"
        );

        distributeReferralRewards(msg.sender, usdtAmount);

        uint256 remainingUsdt = usdtAmount;
        uint256 tokensToReceive = 0;
        uint256 sold = totalTokensSold;

        uint256[7] memory trancheLimits = [
            uint256(10_000_000),
            uint256(15_000_000),
            uint256(20_000_000),
            uint256(25_000_000),
            uint256(30_000_000),
            uint256(25_000_000),
            uint256(25_000_000)
        ];

        uint256[7] memory tranchePrices = [
            uint256(100_000),
            uint256(120_000),
            uint256(150_000),
            uint256(180_000),
            uint256(220_000),
            uint256(260_000),
            uint256(300_000)
        ];

        uint256 trancheSold = sold;

        for (
            uint256 i = 0;
            i < trancheLimits.length && remainingUsdt > 0;
            i++
        ) {
            uint256 trancheCap = trancheLimits[i] * 1e18;
            if (trancheSold >= trancheCap) {
                trancheSold -= trancheCap;
                continue;
            }

            uint256 tokensLeftInTranche = trancheCap - trancheSold;
            uint256 price = tranchePrices[i];
            uint256 maxTokensInThisTranche = (remainingUsdt * 1e18) / price;
            uint256 tokensToBuy = maxTokensInThisTranche < tokensLeftInTranche
                ? maxTokensInThisTranche
                : tokensLeftInTranche;
            uint256 cost = (tokensToBuy * price) / 1e18;

            tokensToReceive += tokensToBuy;
            remainingUsdt -= cost;
            trancheSold += tokensToBuy;
        }

        require(
            totalTokensSold + tokensToReceive <= TOTAL_TOKENS_FOR_SALE,
            "Not enough tokens left"
        );

        userUsdtSpent[msg.sender] += usdtAmount - remainingUsdt;
        userTokensPurchased[msg.sender] += tokensToReceive;

        totalUsdtRaised += usdtAmount - remainingUsdt;
        totalTokensSold += tokensToReceive;

        emit TokensPurchased(
            msg.sender,
            usdtAmount - remainingUsdt,
            tokensToReceive,
            referrer,
            block.timestamp
        );
    }

    function distributeReferralRewards(
        address buyer,
        uint256 usdtAmount
    ) internal {
        address currentReferrer = referrerOf[buyer];
        uint256[8] memory rewardPercents = [uint256(10), 3, 2, 1, 1, 1, 1, 1];

        for (uint256 level = 0; level < 8; level++) {
            if (currentReferrer == address(0)) break;

            uint256 reward = (usdtAmount * rewardPercents[level]) / 100;

            if (reward > 0) {
                usdt.transfer(currentReferrer, reward);
                userAmountUsdtPerLevel[currentReferrer][level] += reward;
                userAmountUsdtPerLevelPerWallet[currentReferrer][level][
                    buyer
                ] += reward;

                if (!referralIsInvestor[currentReferrer][buyer]) {
                    userReferralsPerLevel[currentReferrer][level].push(buyer);
                    userReferralCountPerLevel[currentReferrer][level]++;
                }

                referralIsInvestor[currentReferrer][buyer] = true;

                emit ReferralRewardPaid(
                    currentReferrer,
                    buyer,
                    level,
                    reward,
                    block.timestamp
                );
            }

            currentReferrer = referrerOf[currentReferrer];
        }

        uint256 remainingBalance = usdt.balanceOf(address(this));
        totalUsdtRaisedRemaining += remainingBalance;
        totalUsdtPaidToSponsors += usdtAmount - remainingBalance;

        require(
            usdt.transfer(owner(), remainingBalance),
            "USDT transfer failed"
        );

        emit RemainingBalanceTransferred(
            owner(),
            remainingBalance,
            block.timestamp
        );
    }

    function getCurrentTokenPrice() public view returns (uint256) {
        uint256 sold = totalTokensSold;

        if (sold < 10_000_000 * 1e18) return 100_000;
        else if (sold < 25_000_000 * 1e18) return 120_000;
        else if (sold < 45_000_000 * 1e18) return 150_000;
        else if (sold < 70_000_000 * 1e18) return 180_000;
        else if (sold < 100_000_000 * 1e18) return 220_000;
        else if (sold < 125_000_000 * 1e18) return 260_000;
        else return 300_000;
    }

    function getUserUsdtSpent(address user) external view returns (uint256) {
        return userUsdtSpent[user];
    }

    function getUserTokensPurchased(
        address user
    ) external view returns (uint256) {
        return userTokensPurchased[user];
    }

    function getUserAmountUsdtPerLevel(
        address user,
        uint256 level
    ) external view returns (uint256) {
        return userAmountUsdtPerLevel[user][level];
    }

    function getUserLevelReferralAmounts(
        address user,
        uint256 level,
        address[] calldata referrals
    ) external view returns (uint256[] memory amounts) {
        uint256 length = referrals.length;
        amounts = new uint256[](length);
        for (uint256 i = 0; i < length; i++) {
            amounts[i] = userAmountUsdtPerLevelPerWallet[user][level][
                referrals[i]
            ];
        }
    }

    function getUserReferralsPerLevel(
        address user,
        uint256 level
    ) external view returns (address[] memory) {
        return userReferralsPerLevel[user][level];
    }

    function getUserReferralCountPerLevel(
        address user,
        uint256 level
    ) external view returns (uint256) {
        return userReferralCountPerLevel[user][level];
    }

    function getReferralInvestment(
        address referrer,
        address referral
    ) external view returns (bool) {
        return referralIsInvestor[referrer][referral];
    }

    function getReferrerOf(address user) external view returns (address) {
        return referrerOf[user];
    }

    function setUserUsdtSpent(address user, uint256 amount) public onlyOwner {
        userUsdtSpent[user] = amount;
    }

    function setUserTokensPurchased(
        address user,
        uint256 amount
    ) public onlyOwner {
        userTokensPurchased[user] = amount;
    }

    function setUserAmountUsdtPerLevel(
        address user,
        uint256 level,
        uint256 amount
    ) public onlyOwner {
        userAmountUsdtPerLevel[user][level] = amount;
    }

    function setUserAmountUsdtPerLevelPerWallet(
        address user,
        uint256 level,
        address wallet,
        uint256 amount
    ) public onlyOwner {
        userAmountUsdtPerLevelPerWallet[user][level][wallet] = amount;
    }

    function addUserReferralPerLevel(
        address user,
        uint256 level,
        address referral
    ) public onlyOwner {
        userReferralsPerLevel[user][level].push(referral);
    }

    function setUserReferralCountPerLevel(
        address user,
        uint256 level,
        uint256 count
    ) public onlyOwner {
        userReferralCountPerLevel[user][level] = count;
    }

    function setReferralIsInvestor(
        address user,
        address referral,
        bool isInvestor
    ) public onlyOwner {
        referralIsInvestor[user][referral] = isInvestor;
    }

    function setReferrerOf(address user, address referrer) public onlyOwner {
        referrerOf[user] = referrer;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
