import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, Signer } from "ethers";
import { MockUSDT, IcoLupe } from "../typechain-types";

describe("Ico Lupe", function () {
    let ico: IcoLupe;
    let mockUSDT: MockUSDT;
    let owner: Signer,
        user1: Signer,
        user2: Signer,
        user3: Signer,
        user4: Signer,
        user5: Signer,
        user6: Signer,
        user7: Signer,
        user8: Signer,
        user9: Signer,
        user10: Signer,
        user11: Signer,
        user12: Signer,
        user13: Signer;

    beforeEach(async () => {
        [
            owner,
            user1,
            user2,
            user3,
            user4,
            user5,
            user6,
            user7,
            user8,
            user9,
            user10,
            user11,
            user12,
            user13,
        ] = await ethers.getSigners();

        const MockUSDTFactory = await ethers.getContractFactory("MockUSDT");
        mockUSDT = (await MockUSDTFactory.deploy("10")) as MockUSDT;
        await mockUSDT.waitForDeployment();

        const users = [
            user1,
            user2,
            user3,
            user4,
            user5,
            user6,
            user7,
            user8,
            user9,
            user10,
            user11,
            user12,
        ];

        for (const user of users) {
            await mockUSDT.mint(await user.getAddress(), ethers.parseUnits("2000", 6));
        }

        const IcoFactory = await ethers.getContractFactory("IcoLupe");
        ico = (await IcoFactory.deploy(await mockUSDT.getAddress())) as IcoLupe;
        await ico.waitForDeployment();
    });

    it("Probamos el contrato", async () => {
        const users = [
            user1,
            user2,
            user3,
            user4,
            user5,
            user6,
            user7,
            user8,
            user9,
            user10,
            user11,
            user12,
            user13,
        ];

        for (const user of users) {
            await mockUSDT
                .connect(user)
                .approve(await ico.getAddress(), ethers.parseUnits("100000", 6));
        }

        await ico.connect(user1).buyTokens(ethers.parseUnits("100", 6), await user13.getAddress());
        await ico.connect(user2).buyTokens(ethers.parseUnits("100", 6), await user1.getAddress());
        await ico.connect(user3).buyTokens(ethers.parseUnits("100", 6), await user2.getAddress());
        await ico.connect(user4).buyTokens(ethers.parseUnits("100", 6), await user3.getAddress());
        await ico.connect(user5).buyTokens(ethers.parseUnits("100", 6), await user4.getAddress());
        await ico.connect(user6).buyTokens(ethers.parseUnits("100", 6), await user5.getAddress());
        await ico.connect(user7).buyTokens(ethers.parseUnits("100", 6), await user6.getAddress());
        await ico.connect(user8).buyTokens(ethers.parseUnits("100", 6), await user7.getAddress());
        await ico.connect(user9).buyTokens(ethers.parseUnits("100", 6), await user8.getAddress());
        await ico.connect(user10).buyTokens(ethers.parseUnits("100", 6), await user9.getAddress());
        await ico.connect(user11).buyTokens(ethers.parseUnits("100", 6), await user10.getAddress());

        const amountToBuy = 100;

        const getBalance = async (signer: Signer) =>
            mockUSDT.balanceOf(await signer.getAddress());

        const [
            balanceBeforeUser12,
            balanceBeforeUser11,
            balanceBeforeUser10,
            balanceBeforeUser9,
            balanceBeforeUser8,
            balanceBeforeUser7,
            balanceBeforeUser6,
            balanceBeforeUser5,
            balanceBeforeUser4,
            balanceBeforeUser3,
            balanceBeforeUser2,
            balanceBeforeUser1,
            balanceBeforeOwner,
        ] = await Promise.all([
            getBalance(user12),
            getBalance(user11),
            getBalance(user10),
            getBalance(user9),
            getBalance(user8),
            getBalance(user7),
            getBalance(user6),
            getBalance(user5),
            getBalance(user4),
            getBalance(user3),
            getBalance(user2),
            getBalance(user1),
            getBalance(owner),
        ]);

        await ico.connect(user12).buyTokens(ethers.parseUnits(amountToBuy.toString(), 6), await user11.getAddress());

        const [
            balanceAfterUser12,
            balanceAfterUser11,
            balanceAfterUser10,
            balanceAfterUser9,
            balanceAfterUser8,
            balanceAfterUser7,
            balanceAfterUser6,
            balanceAfterUser5,
            balanceAfterUser4,
            balanceAfterUser3,
            balanceAfterUser2,
            balanceAfterUser1,
            balanceAfterOwner,
        ] = await Promise.all([
            getBalance(user12),
            getBalance(user11),
            getBalance(user10),
            getBalance(user9),
            getBalance(user8),
            getBalance(user7),
            getBalance(user6),
            getBalance(user5),
            getBalance(user4),
            getBalance(user3),
            getBalance(user2),
            getBalance(user1),
            getBalance(owner),
        ]);

        const parse = (val: number) => ethers.parseUnits(val.toString(), 6);

        expect(balanceAfterUser12).to.equal(balanceBeforeUser12 - parse(amountToBuy));
        expect(balanceAfterUser11).to.equal(balanceBeforeUser11 + parse((amountToBuy * 10) / 100));
        expect(balanceAfterUser10).to.equal(balanceBeforeUser10 + parse((amountToBuy * 3) / 100));
        expect(balanceAfterUser9).to.equal(balanceBeforeUser9 + parse((amountToBuy * 2) / 100));
        expect(balanceAfterUser8).to.equal(balanceBeforeUser8 + parse((amountToBuy * 1) / 100));
        expect(balanceAfterUser7).to.equal(balanceBeforeUser7 + parse((amountToBuy * 1) / 100));
        expect(balanceAfterUser6).to.equal(balanceBeforeUser6 + parse((amountToBuy * 1) / 100));
        expect(balanceAfterUser5).to.equal(balanceBeforeUser5 + parse((amountToBuy * 1) / 100));
        expect(balanceAfterUser4).to.equal(balanceBeforeUser4 + parse((amountToBuy * 1) / 100));
        expect(balanceAfterUser1).to.equal(balanceBeforeUser1);
        expect(balanceAfterOwner).to.equal(balanceBeforeOwner + parse((amountToBuy * 80) / 100));

        const [userTokensPurchased, userUsdtSpent, referrerOf] = await Promise.all([
            ico.userTokensPurchased(await user12.getAddress()),
            ico.userUsdtSpent(await user12.getAddress()),
            ico.referrerOf(await user12.getAddress()),
        ]);

        const userAmountUsdtPerLevelUser11 = await ico.userAmountUsdtPerLevel(await user11.getAddress(), 0);
        const userAmountUsdtPerLevelUser1 = await ico.userAmountUsdtPerLevel(await user1.getAddress(), 0);
        const userAmountUsdtPerLevelUser1Nivel2 = await ico.userAmountUsdtPerLevel(await user1.getAddress(), 1);
        const userAmountUsdtPerLevelUser1Nivel5 = await ico.userAmountUsdtPerLevel(await user1.getAddress(), 4);
        const userAmountUsdtPerLevelUser1Nivel3 = await ico.userAmountUsdtPerLevel(await user1.getAddress(), 2);

        const [
            totalUsdtRaised,
            totalTokensSold,
            totalUsdtPaidToSponsors,
            totalUsdtRaisedRemaining,
        ] = await Promise.all([
            ico.totalUsdtRaised(),
            ico.totalTokensSold(),
            ico.totalUsdtPaidToSponsors(),
            ico.totalUsdtRaisedRemaining(),
        ]);

        const tokenPrice = ethers.parseUnits("0.10", 6); // 0.10 USDT
        const amountPaid = ethers.parseUnits(amountToBuy.toString(), 6); // 100 USDT

        const expectedTokens = amountPaid * BigInt(10) ** BigInt(18) / tokenPrice;

        console.log("userTokensPurchased:", userTokensPurchased.toString());
        console.log("tokensExpected:", expectedTokens.toString());


        //VALORES DE USUARIO
        expect(userUsdtSpent).to.equal(ethers.parseUnits(amountToBuy.toString(), 6)); // Esperamos que haya gastado 100 usdt
        expect(userTokensPurchased).to.equal(expectedTokens);
        /* expect(referrerOf).to.equal(user11.getAddress()); */    //Esperamos que el sponsor sea el getAddress() del user 11
        expect(userAmountUsdtPerLevelUser11).to.equal(ethers.parseUnits((10).toString(), 6));    //Esperamos que la cantidad reacaudad en nivel 0 del user 11 sea de 8 usdt ya que fue directo una ves sola
        expect(userAmountUsdtPerLevelUser1).to.equal(ethers.parseUnits((10).toString(), 6));    //Esperamos que la cantidad reacaudad en nivel 1 del user 1 sea de 8 usdt ya que fue directo una ves sola
        expect(userAmountUsdtPerLevelUser1Nivel2).to.equal(ethers.parseUnits((3).toString(), 6));    //Esperamos que la cantidad reacaudad en nivel 2 del user 1 sea de 4 usdt ya que tuvo compras una ves sola en ese nivel
        expect(userAmountUsdtPerLevelUser1Nivel3).to.equal(ethers.parseUnits((2).toString(), 6));    //Esperamos que la cantidad reacaudad en nivel 5 del user 1 sea de 1 usdt ya que tuvo compras una ves sola en ese nivel
        expect(userAmountUsdtPerLevelUser1Nivel5).to.equal(ethers.parseUnits((1).toString(), 6));    //Esperamos que la cantidad reacaudad en nivel 10 del user 1 sea de 0.5 usdt ya que tuvo compras una ves sola en ese nivel

        //VALORES GENERALES
        expect(totalUsdtRaised).to.equal(ethers.parseUnits((amountToBuy * 12).toString(), 6));                                    //Esperamos que valga 12,000 ya que hubo 12 compras, con un valor de 100 USDTs cada una
        expect(totalTokensSold).to.equal(ethers.parseUnits(((((amountToBuy) / 0.10) * 12) * 1).toString(), 18));          //Esperamos que haya generado 12000 ya que es el total de tokens habiendo pagado  1200 usd a un valor de 0.10 de las 12 compras
        expect(totalUsdtPaidToSponsors).to.equal(ethers.parseUnits((208).toString(), 6));           //Esperamos que sea 208 ya que si sumamos todo los referidos nos da ese numero
        expect(totalUsdtRaisedRemaining).to.equal(ethers.parseUnits((992).toString(), 6));           //Esperamos que sea 992 ya que si restamos Total de dinero recaudado - pagado a referidos da este numero. 1200 - 198.5 = 1001.5

    });
});