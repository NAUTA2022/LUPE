// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ICO is Ownable {
    IERC20 public usdt;

    uint256 public constant TOTAL_TOKENS_FOR_SALE = 25_000_000_000 * 1e18;
    uint256 public constant USDT_HARDCAP = 200_000 * 1e6;
    uint256 public constant MIN_PURCHASE = 50 * 1e6;

    uint256 public totalTokensSold;
    uint256 public totalTokensSoldWithoutBonus;
    uint256 public totalUsdtRaised;
    uint256 public totalUsdtRaisedRemaining;
    uint256 public totalUsdtPaidToSponsors;

    uint256 public startTime;
    uint256 public endTime;

    mapping(address => uint256) public userUsdtSpent;
    mapping(address => uint256) public userTokensPurchased;
    mapping(address => uint256) public userTokensPurchasedWithoutBonus;
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
        uint256 bonus,
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

    constructor(address _usdt) Ownable(msg.sender) {
        usdt = IERC20(_usdt);
    }

    function buyTokens(uint256 usdtAmount, address referrer) external {
        require(block.timestamp >= startTime, "ICO has not started yet");
        require(block.timestamp <= endTime, "ICO has ended");
        require(usdtAmount >= MIN_PURCHASE, "Minimum 50 USDT");
        require(
            totalUsdtRaised + usdtAmount <= USDT_HARDCAP,
            "Hardcap reached"
        );
        require(referrer != msg.sender, "You cannot refer yourself");
        require(referrer != address(0), "Referrer cannot be address 0");

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

        uint256 tokenPrice = getCurrentTokenPrice();
        uint256 tokensToReceive = (usdtAmount * 1e18) / tokenPrice;
        uint256 bonus = (tokensToReceive * 20) / 100;
        uint256 totalTokensWithBonus = tokensToReceive + bonus;

        require(
            totalTokensSold + totalTokensWithBonus <= TOTAL_TOKENS_FOR_SALE,
            "Not enough tokens left"
        );

        userUsdtSpent[msg.sender] += usdtAmount;
        userTokensPurchased[msg.sender] += totalTokensWithBonus;
        userTokensPurchasedWithoutBonus[msg.sender] += tokensToReceive;

        totalUsdtRaised += usdtAmount;
        totalTokensSold += totalTokensWithBonus;
        totalTokensSoldWithoutBonus += tokensToReceive;

        emit TokensPurchased(
            msg.sender,
            usdtAmount,
            tokensToReceive,
            bonus,
            referrer,
            block.timestamp
        );
    }

    function distributeReferralRewards(address buyer, uint256 usdtAmount)
        internal
    {
        address currentReferrer = referrerOf[buyer];
        uint256[10] memory rewardPercents = [
            uint256(8),
            4,
            2,
            1,
            1,
            1,
            1,
            1,
            50,
            50
        ];

        for (uint256 level = 0; level < 10; level++) {
            if (currentReferrer == address(0)) {
                break;
            }

            uint256 percent = rewardPercents[level];
            uint256 reward;

            if (level < 8) {
                reward = (usdtAmount * percent) / 100;
            } else {
                reward = (usdtAmount * percent) / 10000;
            }

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
        if (totalUsdtRaised < 50_000 * 1e6) {
            return 10; // 0.00001
        } else if (totalUsdtRaised < 100_000 * 1e6) {
            return 20; // 0.00002
        } else if (totalUsdtRaised < 150_000 * 1e6) {
            return 30; // 0.00003
        } else {
            return 40; // 0.00004
        }
    }

    function getUserUsdtSpent(address user) external view returns (uint256) {
        return userUsdtSpent[user];
    }

    function getUserTokensPurchased(address user)
        external
        view
        returns (uint256)
    {
        return userTokensPurchased[user];
    }

    function getUserTokensPurchasedWithoutBonus(address user)
        external
        view
        returns (uint256)
    {
        return userTokensPurchasedWithoutBonus[user];
    }

    function getUserAmountUsdtPerLevel(address user, uint256 level)
        external
        view
        returns (uint256)
    {
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

    function getUserReferralsPerLevel(address user, uint256 level)
        external
        view
        returns (address[] memory)
    {
        return userReferralsPerLevel[user][level];
    }

    function getUserReferralCountPerLevel(address user, uint256 level)
        external
        view
        returns (uint256)
    {
        return userReferralCountPerLevel[user][level];
    }

    function getReferralInvestment(address referrer, address referral)
        external
        view
        returns (bool)
    {
        return referralIsInvestor[referrer][referral];
    }

    function getReferrerOf(address user) external view returns (address) {
        return referrerOf[user];
    }

    function adminUpdateGeneralData(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _totalTokensSold,
        uint256 _totalTokensSoldWithoutBonus,
        uint256 _totalUsdtRaised,
        uint256 _totalUsdtRaisedRemaining,
        uint256 _totalUsdtPaidToSponsors
    ) public onlyOwner {
        startTime = _startTime;
        endTime = _endTime;
        totalTokensSold = _totalTokensSold;
        totalTokensSoldWithoutBonus = _totalTokensSoldWithoutBonus;
        totalUsdtRaised = _totalUsdtRaised;
        totalUsdtRaisedRemaining = _totalUsdtRaisedRemaining;
        totalUsdtPaidToSponsors = _totalUsdtPaidToSponsors;
    }



    function setUserUsdtSpent(address user, uint256 amount) public onlyOwner {
        userUsdtSpent[user] = amount;
    }

    function setUserTokensPurchased(address user, uint256 amount) public onlyOwner {
        userTokensPurchased[user] = amount;
    }

    function setUserTokensPurchasedWithoutBonus(address user, uint256 amount) public onlyOwner {
        userTokensPurchasedWithoutBonus[user] = amount;
    }

    function setUserAmountUsdtPerLevel(address user, uint256 level, uint256 amount) public onlyOwner {
        userAmountUsdtPerLevel[user][level] = amount;
    }

    function setUserAmountUsdtPerLevelPerWallet(address user, uint256 level, address wallet, uint256 amount) public onlyOwner {
        userAmountUsdtPerLevelPerWallet[user][level][wallet] = amount;
    }

    function addUserReferralPerLevel(address user, uint256 level, address referral) public onlyOwner {
        userReferralsPerLevel[user][level].push(referral);
    }

    function setUserReferralCountPerLevel(address user, uint256 level, uint256 count) public onlyOwner {
        userReferralCountPerLevel[user][level] = count;
    }

    function setReferralIsInvestor(address user, address referral, bool isInvestor) public onlyOwner {
        referralIsInvestor[user][referral] = isInvestor;
    }

    function setReferrerOf(address user, address referrer) public onlyOwner {
        referrerOf[user] = referrer;
    }

 
}