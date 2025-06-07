import React, { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import FondoAnimado from './FondoAnimado'
import { ethers } from "ethers";
import { ConnectButton, lightTheme, useActiveAccount, useReadContract } from "thirdweb/react";
import { defineChain, polygon } from "thirdweb/chains";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { client } from "../client";
import { ICO, IcoAddress, USDT } from '../contracts';
import { prepareContractCall, sendTransaction, waitForReceipt } from 'thirdweb';
import { ToastContainer, toast } from 'react-toastify';
import { icoABI } from '../abis/ico';

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "telegram",
        "email",
        "passkey",
        "phone",
        "apple",
        "facebook",
      ],
    },
  }),

  createWallet("io.metamask"),
  createWallet("com.trustwallet.app"),
  /* createWallet("com.binance"), */
];

export const connectButtonOptions = {
  wallets: wallets,
  chain: polygon,
  connectModal: {
    size: "compact",
    title: "Lupe Wallet",
    // titleIcon:
    //TokenUs,
    showThirdwebBranding: false,
    termsOfServiceUrl:
      "",
  },
  appMetadata: {
    name: "Lupe Wallet",
    url: "",
    //logoUrl: TokenUs, Paso 1 Trajimos el proyecto desde github, Paso 2 Verificar dependencias e instalar necesarias, Paso 3 Conectamos Boton de wallet + client id
  },

};


const Hero = () => {
  const [usdtAmount, setUsdtAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [referralsData, setReferralsData] = useState([]);
  const [loadingReferrals, setLoadingReferrals] = useState(false);
  const [splineApp, setSplineApp] = useState(null);


  const address = useActiveAccount();
  const chain = defineChain(137);
  const userWallet = address?.address;

  const gobalParams = new URLSearchParams(window.location.search);
  const globalRreferral = gobalParams.get("referral");
  console.log("Referral:", globalRreferral);

  console.log(userWallet)

  /* const { connect } = ConnectButton(); */

  const { data: referrerOf } = useReadContract({
    contract: ICO,
    method: "referrerOf",
    params: [userWallet],
  });





  const { data: sponsorUsdtSpent } = useReadContract({
    contract: ICO,
    method: "userUsdtSpent",
    params: [globalRreferral],
  });

  console.log(sponsorUsdtSpent)

  const { data: userUsdtSpent } = useReadContract({
    contract: ICO,
    method: "userUsdtSpent",
    params: [userWallet],
  });

  const { data: userTokensPurchased } = useReadContract({
    contract: ICO,
    method: "userTokensPurchased",
    params: [userWallet],
  });
  const { data: userTokensPurchasedWithoutBonus } = useReadContract({
    contract: ICO,
    method: "userTokensPurchasedWithoutBonus",
    params: [userWallet],
  });


  const { data: userAmountUsdtPerLevel1 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 0],
  });

  const { data: getUserReferralCountPerLevel1 } = useReadContract({
    contract: ICO,
    method: "getUserReferralCountPerLevel",
    params: [userWallet, 0],
  });


  const { data: userAmountUsdtPerLevel2 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 1],
  });

  const { data: getUserReferralCountPerLevel2 } = useReadContract({
    contract: ICO,
    method: "getUserReferralCountPerLevel",
    params: [userWallet, 1],
  });


  const { data: userAmountUsdtPerLevel3 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 2],
  });

  const { data: getUserReferralCountPerLevel3 } = useReadContract({
    contract: ICO,
    method: "getUserReferralCountPerLevel",
    params: [userWallet, 2],
  });


  const { data: userAmountUsdtPerLevel4 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 3],
  });

  const { data: getUserReferralCountPerLevel4 } = useReadContract({
    contract: ICO,
    method: "getUserReferralCountPerLevel",
    params: [userWallet, 3],
  });



  const { data: userAmountUsdtPerLevel5 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 4],
  });

  const { data: getUserReferralCountPerLevel5 } = useReadContract({
    contract: ICO,
    method: "getUserReferralCountPerLevel",
    params: [userWallet, 4],
  });



  const { data: userAmountUsdtPerLevel6 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 5],
  });

  const { data: getUserReferralCountPerLevel6 } = useReadContract({
    contract: ICO,
    method: "getUserReferralCountPerLevel",
    params: [userWallet, 5],
  });



  const { data: userAmountUsdtPerLevel7 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 6],
  });

  const { data: getUserReferralCountPerLevel7 } = useReadContract({
    contract: ICO,
    method: "getUserReferralCountPerLevel",
    params: [userWallet, 6],
  });


  const { data: userAmountUsdtPerLevel8 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 7],
  });

  const { data: getUserReferralCountPerLevel8 } = useReadContract({
    contract: ICO,
    method: "getUserReferralCountPerLevel",
    params: [userWallet, 7],
  });


  const { data: userAmountUsdtPerLevel9 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 8],
  });

  const { data: getUserReferralCountPerLevel9 } = useReadContract({
    contract: ICO,
    method: "getUserReferralCountPerLevel",
    params: [userWallet, 8],
  });


  const { data: userAmountUsdtPerLevel10 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 9],
  });

  const { data: getUserReferralCountPerLevel10 } = useReadContract({
    contract: ICO,
    method: "getUserReferralCountPerLevel",
    params: [userWallet, 9],
  });




  const { data: totalTokensSold } = useReadContract({
    contract: ICO,
    method: "totalTokensSold",
    params: [],
  });

  const { data: totalUsdtRaised } = useReadContract({
    contract: ICO,
    method: "totalUsdtRaised",
    params: [],
  });

  const { data: totalUsdtPaidToSponsors } = useReadContract({
    contract: ICO,
    method: "totalUsdtPaidToSponsors",
    params: [],
  });


  const tokenSold = totalTokensSold !== undefined && totalTokensSold !== null
    ? Number(ethers.formatUnits(totalTokensSold, 18)).toLocaleString()
    : "Loading...";

  const usdtRaised = totalUsdtRaised !== undefined && totalUsdtRaised !== null
    ? Number(ethers.formatUnits(totalUsdtRaised, 6)).toLocaleString()
    : "Loading...";

  const totalPayedSponsors = totalUsdtPaidToSponsors !== undefined && totalUsdtPaidToSponsors !== null
    ? Number(ethers.formatUnits(totalUsdtPaidToSponsors, 6)).toLocaleString()
    : "Loading...";

  const totalInvested = userUsdtSpent !== undefined && userUsdtSpent !== null
    ? Number(ethers.formatUnits(userUsdtSpent, 6)).toLocaleString()
    : "Loading...";

  const totalTokenBuyed = userTokensPurchased !== undefined && userTokensPurchased !== null
    ? Number(ethers.formatUnits(userTokensPurchased, 18)).toLocaleString()
    : "Loading...";

  /* const totalTokenBuyedWithoutBonus = userTokensPurchasedWithoutBonus !== undefined && userTokensPurchasedWithoutBonus !== null
    ? Number(ethers.formatUnits(userTokensPurchasedWithoutBonus, 18)).toLocaleString()
    : "Loading..."; */




  console.log(referrerOf)

  const handleBuy = async (amount) => {
    if (!amount || Number(amount) <= 0) {
      amountTx()
      return;
    }

    if (amount <= 100) {
      minInvestTx()
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const referral = params.get("referral");
    console.log("Referral:", referral);

    setIsProcessing(true);
    try {

      console.log(address)

      if (address == undefined) {
        //throw new Error("User address not found.");
        return
      }

      if (referrerOf == "0x0000000000000000000000000000000000000000") { //Si no tiene referido
        if (referral == undefined) { //Si no tiene referido puesto en el link
          sponsorTx()
          //throw new Error("This is your first purchase, you must have a referrer.");
          return
        }
      }

      console.log(BigInt(Number(50) * 1_000_000))

      // if (sponsorUsdtSpent < BigInt(Number(50)* 1_000_000)) { 
      //     needInvestTx()
      //    // throw new Error("This is your first purchase, you must have a referrer.");
      //    return
      // }

      const estimatedGasLimit = BigInt(50000); // puedes ajustar esto tras estimar gas real
      const targetGasCost = BigInt(0.20 * 1e18); // 0.20 POLS en wei
      const gasPrice = targetGasCost / estimatedGasLimit;
      console.log(gasPrice)

      const approvalUsdt = prepareContractCall({
        contract: USDT,
        method: "approve",
        params: [IcoAddress, BigInt(Math.floor(Number(amount) * 1_000_000))],
        gasPrice: gasPrice,
      });

      const { transactionHash: approveHashUsdt } = await sendTransaction({
        transaction: approvalUsdt,
        account: address,
      });

      await waitForReceipt({
        client: client,
        chain: chain,
        transactionHash: approveHashUsdt,
      });
      console.log("Aprovado");


      const buy = prepareContractCall({
        contract: ICO,
        method: "buyTokens",
        params: [BigInt(Math.floor(Number(amount) * 1_000_000)), referral == undefined ? "0x0000000000000000000000000000000000000001" : referral],
        gasPrice: gasPrice,
      });

      const { transactionHash: buyHash } = await sendTransaction({
        transaction: buy,
        account: address,
      });

      await waitForReceipt({
        client: client,
        chain: chain,
        transactionHash: buyHash,
      });

      succesTx()
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error) {
      console.error("Error:", error);
      alert(error.message)
      errorTx()
    } finally {
      setIsProcessing(false); // Ocultar pantalla gris

    }
  };

  const succesTx = () => {
    toast.success('Thank you for being part of this journey. See you on the moon.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const copyCode = () => {
    toast.success('Referral code copy succes', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const errorTx = () => {
    toast.warn('Error, please contact support.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const amountTx = () => {
    toast.info('Invalid amount', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const minInvestTx = () => {
    toast.info('The minimum investment is 100 USD', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const sponsorTx = () => {
    toast.info('Its your first purchase, you must add a sponsor to your link', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const needInvestTx = () => {
    toast.info('Your sponsor never invested', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };



  const loadReferralsData = async (level) => {
    try {
      setLoadingReferrals(true);
      const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/");

      const contract = new ethers.Contract(IcoAddress, icoABI, provider);

      const referralsRaw = await contract.getUserReferralsPerLevel(userWallet, level);
      const referrals = Array.from(referralsRaw);

      if (referrals.length === 0) {
        setReferralsData([]);
        setLoadingReferrals(false);
        return;
      }

      const amountsRaw = await contract.getUserLevelReferralAmounts(userWallet, level, referrals);
      const amounts = Array.from(amountsRaw);

      const referralDetails = referrals.map((refWallet, i) => ({
        wallet: refWallet,
        amount: Number(ethers.formatUnits(amounts[i], 6)),
      }));

      setReferralsData(referralDetails);
      setLoadingReferrals(false);
    } catch (error) {
      console.error("Error loading referrals:", error);
      setLoadingReferrals(false);
    }
  };


  useEffect(() => {
    if (expandedLevel !== null) {
      loadReferralsData(expandedLevel);
    }
  }, [expandedLevel]);

  useEffect(() => {
    const handleResize = () => {
      if (splineApp) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        splineApp.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    // Ajustar tamaño inicial
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [splineApp]);

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <ToastContainer />
      <FondoAnimado />

      {/* Modelo 3D de fondo */}
      {/* <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}>
        <Spline
          scene="https://prod.spline.design/m5E2hkQzMPP2QApM/scene.splinecode"
          style={{
            width: '100%',
            height: '100%'
          }}
          onLoad={(spline) => {
            console.log('Spline loaded successfully');
          }}
          onError={(error) => {
            console.error('Spline error:', error);
          }}
        />
      </div> */}

      {/* Iluminación naranja difuminada superior */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 0% 0%, rgba(206, 162, 43, 0.15) 0%, transparent 70%)',
        zIndex: 1
      }} />
      {/* Iluminación naranja difuminada inferior - más sutil */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 0% 100%, rgba(206, 162, 43, 0.1) 0%, transparent 50%)',
        zIndex: 1
      }} />

      {/* Contenido principal */}
      <div className="container-fluid h-100 d-flex align-items-center" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row w-100">
          <div className="col-md-8 col-lg-7 d-flex flex-column justify-content-center px-4" style={{ marginLeft: '5%' }}>
            <div className="d-flex flex-column">
              <h1 className="display-4 fw-bold mb-3 text-white" style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                lineHeight: '1.2',
                fontFamily: "'Orbitron', sans serif"
              }}>LUPE your Gateway<br />to the future Real Estate</h1>
              <p
                className="lead mb-4 text-white"
                style={{
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                  fontFamily: "'Orbitron', sans serif",
                  lineHeight: '1.4'
                }}
              >
                Evolving crypto economy, offering staking rewards and innovative
                opportunities On Chain Ecosystem.
              </p>

              <ConnectButton
              client={client}
              // accountAbstraction={{
              //   chain: polygon,
              //   sponsorGas: true,
              // }}
              {...connectButtonOptions}

              connectButton={{ label: "Ingresar" }}
              locale={"es_ES"}
              theme={lightTheme({
                colors: {
                  primaryButtonBg: "Orange",
                  primaryButtonText: "Ingresar",
                },
                fontFamily: "'Orbitron', sans serif",
              })}
            />
            <br />
            <br />

             
            </div>
          </div>
        </div>
      </div>

      {/* Modal del Dashboard */}
      {showDashboard && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '20px',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center',
            position: 'relative',
            fontFamily: "'Orbitron', sans serif",
            maxHeight: '80vh',            // 👈 limita la altura
            overflowY: 'auto'             // 👈 activa scroll vertical si se necesita,
          }}>





            {expandedLevel !== null ? (
              // Vista expandida
              <>
                <button
                  onClick={() => setExpandedLevel(null)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                  }}
                >
                  🔙
                </button>
                <h2>Level {expandedLevel + 1} Details</h2>
                {expandedLevel !== null && (
                  <p><strong>Total USDT received:</strong> {
                    Number(ethers.formatUnits(
                      expandedLevel === 0 ? userAmountUsdtPerLevel1 :
                        expandedLevel === 1 ? userAmountUsdtPerLevel2 :
                          expandedLevel === 2 ? userAmountUsdtPerLevel3 :
                            expandedLevel === 3 ? userAmountUsdtPerLevel4 :
                              expandedLevel === 4 ? userAmountUsdtPerLevel5 :
                                expandedLevel === 5 ? userAmountUsdtPerLevel6 :
                                  expandedLevel === 6 ? userAmountUsdtPerLevel7 :
                                    expandedLevel === 7 ? userAmountUsdtPerLevel8 :
                                      expandedLevel === 8 ? userAmountUsdtPerLevel9 :
                                        expandedLevel === 9 ? userAmountUsdtPerLevel10 :
                                          0, // fallback
                      6
                    )).toLocaleString()}
                  </p>
                )}

                <p><strong>Number of referrals:</strong>


                  {

                    expandedLevel === 0 ? getUserReferralCountPerLevel1 :
                      expandedLevel === 1 ? getUserReferralCountPerLevel2 :
                        expandedLevel === 2 ? getUserReferralCountPerLevel3 :
                          expandedLevel === 3 ? getUserReferralCountPerLevel4 :
                            expandedLevel === 4 ? getUserReferralCountPerLevel5 :
                              expandedLevel === 5 ? getUserReferralCountPerLevel6 :
                                expandedLevel === 6 ? getUserReferralCountPerLevel7 :
                                  expandedLevel === 7 ? getUserReferralCountPerLevel8 :
                                    expandedLevel === 8 ? getUserReferralCountPerLevel9 :
                                      expandedLevel === 9 ? getUserReferralCountPerLevel10 :
                                        0
                  }

                </p>


                {loadingReferrals ? (
                  <p>Loading referral details...</p>
                ) : (
                  <ul style={{ textAlign: 'left' }}>
                    {referralsData.map((ref, index) => (
                      <li key={index}>
                        {/* <strong>Wallet:</strong> {ref.wallet.slice(0, 4)}...{ref.wallet.slice(-4)}<br /> */}

                        <strong>Wallet:</strong> <span style={{ fontSize: "75%" }}>{ref.wallet}</span> <br></br>
                        <strong>Amount:</strong> ${ref.amount.toLocaleString()}
                        <hr />
                      </li>
                    ))}
                    {referralsData.length === 0 && <p>No referrals found at this level.</p>}
                  </ul>
                )}

              </>
            ) : (
              <>

                <button
                  onClick={() => setShowDashboard(false)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                  }}
                >
                  ✖️
                </button>
                <br />
                <h2>Your Personal Dashboard</h2>
                <p>Total Invested: ${totalInvested} <br></br>
                  {Number(String(totalInvested).replace(/,/g, "")) >= 1000 ? <>You are part of the DAO</> : <> 🚀 You are missing <span style={{ color: "green" }}>{1000 - Number(String(totalInvested).replace(/,/g, ""))}</span> USDTs to activate your voting power in the DAO </>}

                </p>
                <p>
                  Total Invested
                  <span style={{ color: "green", fontWeight: "bold" }}> (with 20% extra) </span>:
                  ${(Number(String(totalInvested).replace(/,/g, "")) * 1.2).toFixed(2)}
                </p>
                <p>Total tokens purchased: {totalTokenBuyedWithoutBonus} $LUPE</p>
                <p>
                  Total tokens purchased
                  <span style={{ color: "green", fontWeight: "bold" }}> (with 20% extra) </span>:
                  ${totalTokenBuyed} $LUPE
                </p>
                {console.log(totalTokenBuyed)}
                <p>

                  🌕 Upon reaching the moon ($0.000416), your $LUPE cost  <span style={{ color: "green", fontWeight: "bold" }}> ${Number(ethers.formatUnits(userTokensPurchased, 18)) * 0.000416}</span>
                </p>

                <hr />
                <p>Total USDTs received at your level 1 (10%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel1, 6)).toLocaleString()}</p> <button onClick={() => setExpandedLevel(0)}>Expand Level</button>
                <p>Total USDTs received at your level 2 (3%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel2, 6)).toLocaleString()}</p><button onClick={() => setExpandedLevel(1)}>Expand Level</button>
                <p>Total USDTs received at your level 3 (2%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel3, 6)).toLocaleString()}</p><button onClick={() => setExpandedLevel(2)}>Expand Level</button>
                <p>Total USDTs received at your level 4 (1%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel4, 6)).toLocaleString()}</p><button onClick={() => setExpandedLevel(3)}>Expand Level</button>
                <p>Total USDTs received at your level 5 (1%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel5, 6)).toLocaleString()}</p><button onClick={() => setExpandedLevel(4)}>Expand Level</button>
                <p>Total USDTs received at your level 6 (1%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel6, 6)).toLocaleString()}</p><button onClick={() => setExpandedLevel(5)}>Expand Level</button>
                <p>Total USDTs received at your level 7 (1%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel7, 6)).toLocaleString()}</p><button onClick={() => setExpandedLevel(6)}>Expand Level</button>
                <p>Total USDTs received at your level 8 (1%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel8, 6)).toLocaleString()}</p><button onClick={() => setExpandedLevel(7)}>Expand Level</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero 