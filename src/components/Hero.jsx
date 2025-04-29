import React, { useState } from 'react'
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
    title: "Eloon Moon Wallet",
    // titleIcon:
    //TokenUs,
    showThirdwebBranding: false,
    termsOfServiceUrl:
      "",
  },
  appMetadata: {
    name: "Eloon Moon Wallet",
    url: "",
    //logoUrl: TokenUs, Paso 1 Trajimos el proyecto desde github, Paso 2 Verificar dependencias e instalar necesarias, Paso 3 Conectamos Boton de wallet + client id
  },

};


const Hero = () => {
  const [usdtAmount, setUsdtAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);

  const address = useActiveAccount();
  const chain = defineChain(137);
  const userWallet = address?.address;

  const gobalParams = new URLSearchParams(window.location.search);
  const globalRreferral = gobalParams.get("referral");
  console.log("Referral:", globalRreferral);

  console.log(userWallet)

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
  const { data: userAmountUsdtPerLevel2 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 1],
  });
  const { data: userAmountUsdtPerLevel3 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 2],
  });
  const { data: userAmountUsdtPerLevel4 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 3],
  });
  const { data: userAmountUsdtPerLevel5 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 4],
  });
  const { data: userAmountUsdtPerLevel6 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 5],
  });
  const { data: userAmountUsdtPerLevel7 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 6],
  });
  const { data: userAmountUsdtPerLevel8 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 7],
  });
  const { data: userAmountUsdtPerLevel9 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
    params: [userWallet, 8],
  });
  const { data: userAmountUsdtPerLevel10 } = useReadContract({
    contract: ICO,
    method: "userAmountUsdtPerLevel",
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


  const tokenSold = totalTokensSold !== undefined  && totalTokensSold !== null
    ? Number(ethers.formatUnits(totalTokensSold, 18)).toLocaleString()
    : "Loading...";

  const usdtRaised = totalUsdtRaised  !== undefined  &&  totalUsdtRaised !== null
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

  const totalTokenBuyedWithoutBonus = userTokensPurchasedWithoutBonus !== undefined && userTokensPurchasedWithoutBonus !== null
    ? Number(ethers.formatUnits(userTokensPurchasedWithoutBonus, 18)).toLocaleString()
    : "Loading...";




  console.log(referrerOf)

  const handleBuy = async (amount) => {
    if (!amount || Number(amount) <= 0) {
      amountTx()
      return;
    }

    if (amount < 50) {
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

      console.log(BigInt(Number(50)* 1_000_000))

      // if (sponsorUsdtSpent < BigInt(Number(50)* 1_000_000)) { 
      //     needInvestTx()
      //    // throw new Error("This is your first purchase, you must have a referrer.");
      //    return
      // }


      const approvalUsdt = prepareContractCall({
        contract: USDT,
        method: "approve",
        params: [IcoAddress, BigInt(Math.floor(Number(amount) * 1_000_000))],
        //gasPrice: doubledGasPrice.toBigInt(),
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
        //gasPrice: doubledGasPrice.toBigInt(),
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
    toast.info('The minimum investment is 50 USD', {
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

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '4rem 0'
    }}>

      <ToastContainer />
      <FondoAnimado />

      {/* Iluminación naranja difuminada superior */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 0% 0%, rgba(255, 165, 0, 0.1) 0%, transparent 70%)',
        zIndex: 0
      }} />
      {/* Iluminación naranja difuminada inferior - más sutil */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 0% 100%, rgba(255, 165, 0, 0.05) 0%, transparent 50%)',
        zIndex: 0
      }} />

      <div className="container-fluid bg-transparent" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row align-items-center justify-content-center px-4 mx-auto bg-transparent" style={{ maxWidth: '1600px' }}>
          <div className="col-md-6 col-lg-5 bg-transparent order-md-2">
            <div style={{
              width: '100%',
              height: '700px',
              backgroundColor: 'transparent',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Imagen para móvil */}
              <div className="d-md-none" style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>

                <img
                  src="/assets/Elon.png"
                  alt="Elon"
                  style={{
                    width: 'auto',
                    height: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              {/* Spline para pantallas medianas y grandes */}
              <div className="d-none d-md-block" style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Spline
                  scene="https://prod.spline.design/hS0tcOmPPCrxkMJM/scene.splinecode"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  onLoad={(spline) => {
                    console.log('Spline loaded successfully');
                    spline.setSize(window.innerWidth, window.innerHeight);
                  }}
                  onError={(error) => {
                    console.error('Spline error:', error);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-5 bg-transparent order-md-1">
            <h1 className="display-3 fw-bold mb-4 text-white">ELON NEEDS YOU </h1>
            <p
              className="lead mb-4 text-white"
              style={{
                fontSize: '1rem',
                fontFamily: "'Orbitron', sans-serif"
              }}
            >
              $ELMO is not just another memecoin.
              It burns 90% of its supply and is aiming for $0.000416.
              Only 20,000 pioneers will be part of this Airdrop.
              <br /><br />

              🚀 Invest from $0.00001 and receive +20% extra.
              Every dollar you invest burns tokens, triggers raffles, and gives you a voice in the DAO.
              <br /><br />

              💥 What if $100 turns into $4,992?
              We’re firing up the engines — but without you, we won’t take off.
            </p>
            <ConnectButton
                    client={client}
                    // accountAbstraction={{
                    //   chain: polygon,
                    //   sponsorGas: true,
                    // }}
                    {...connectButtonOptions}

                    connectButton={{ label: "Connect Wallet" }}
                    locale={"es_ES"}
                    theme={lightTheme({
                      colors: {
                        primaryButtonBg: "green",
                        primaryButtonText: "Connect Wallet",
                      },
                      fontFamily: "'Orbitron', sans-serif"
                    })}


                  />
                  <br />
                  <br />
            <div className="d-flex gap-3 mb-4">

              {address ?
                <>
                 

                  <input
                    onChange={(e) => {
                      setUsdtAmount(e.target.value);
                    }}
                    value={usdtAmount}
                    type="number"
                  />
                  <button
                    onClick={() => handleBuy(usdtAmount)}
                    style={{
                      fontSize: '1rem',
                      fontFamily: "'Orbitron', sans-serif",
                      minWidth: '130px', // para que no se achique cuando aparece el spinner
                    }}
                    className="btn btn-outline-light btn-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="spinner-border text-light" style={{ width: '1.5rem', height: '1.5rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Comprar"
                    )}
                  </button>




                </>
                :

                    <></>
                // <ConnectButton
                //   client={client}
                //   // accountAbstraction={{
                //   //   chain: polygon,
                //   //   sponsorGas: true,
                //   // }}
                //   {...connectButtonOptions}

                //   connectButton={{ label: "Connect Wallet" }}
                //   locale={"es_ES"}
                //   theme={lightTheme({
                //     colors: {
                //       primaryButtonBg: "green",
                //       primaryButtonText: "Connect Wallet",
                //     },
                //     fontFamily: "'Orbitron', sans-serif"
                //   })}


                // />
                }

            </div>

            <p
              className="lead mb-4 text-white"
              style={{
                fontSize: '1rem',
                fontFamily: "'Orbitron', sans-serif"
              }}
            >
              Total tokens sold:
              {tokenSold} $ELMO
              <br />
              Total USDT paid in referrals:
              ${totalPayedSponsors}
              <br />
              Total USDT paid in referrals:
              Total USDT Raised: ${Number(String(usdtRaised).replace(/,/g, ""))} / 200,000
              <div style={{
                position: 'relative',
                height: '30px',
                background: '#ddd',
                borderRadius: '20px',
                overflow: 'hidden'
              }}>
                {console.log(Number(usdtRaised.replace(/,/g, '')))}
                <div style={{
                  height: '100%',
                  width: `${Math.min((Number(totalUsdtRaised) / 200000000000) * 100, 100)}%`, // 200000 con 6 decimales
                  background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                  transition: 'width 1s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '5px',
                }}>
                </div>
                {/* Cohete */}
                <div style={{
                  position: 'absolute',
                  top: '-5px', // para que quede encima de la barra
                  left: `calc(${Math.min((Number(totalUsdtRaised) / 200000000000) * 100, 100)}% - 12px)`, // -12px para centrar el emoji
                  transition: 'left 1s ease-in-out',
                  fontSize: '24px',
                }}>
                  🚀
                </div>

              </div>

            </p>

            {address ? <>

              <button
                onClick={() => setShowDashboard(true)}
                style={{
                  fontSize: '1rem',
                  fontFamily: "'Orbitron', sans-serif"
                }} className="btn btn-outline-light btn-lg">Personal Dashboard </button>

              <button
                onClick={() => {
                  const referralLink = `${window.location.origin}/?referral=${address.address}`;
                  navigator.clipboard.writeText(referralLink)
                    .then(() => {
                      copyCode();
                    })
                    .catch(err => {
                      console.error("Failed to copy: ", err);
                    });
                }}
                style={{
                  fontSize: '1rem',
                  fontFamily: "'Orbitron', sans-serif",
                  minWidth: '130px',
                }}
                className="btn btn-outline-light btn-lg"
              >
                Copy referral link
              </button>

            </>


              : <></>}
            <br />
            <br />
            <br />
            <a
              href="https://chatgpt.com/g/g-68083ff0f5408191af9e9138ca2135c8-elonbot-mooncommander"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                style={{
                  fontSize: '1rem',
                  fontFamily: "'Orbitron', sans-serif",
                  minWidth: '130px',
                }}
                className="btn btn-outline-light btn-lg"
              >
                Questions? Talk with Elon
              </button>
            </a>

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
                  fontFamily: "'Orbitron', sans-serif",
                  maxHeight: '80vh',            // 👈 limita la altura
                  overflowY: 'auto'             // 👈 activa scroll vertical si se necesita,
                }}>
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
                  <p>Total tokens purchased: {totalTokenBuyedWithoutBonus} $ELMO</p>
                  <p>
                    Total tokens purchased
                    <span style={{ color: "green", fontWeight: "bold" }}> (with 20% extra) </span>:
                    ${totalTokenBuyed} $ELMO
                  </p>
                  {console.log(totalTokenBuyed)}
                  <p>

                    🌕 Upon reaching the moon ($0.000416), your $ELMO cost  <span style={{ color: "green", fontWeight: "bold" }}> ${Number(ethers.formatUnits(userTokensPurchased, 18)) * 0.000416}</span>
                  </p>

                  <hr />
                  <p>Total USDTs received at your level 1 (8%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel1, 6)).toLocaleString()}</p>
                  <p>Total USDTs received at your level 2 (4%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel2, 6)).toLocaleString()}</p>
                  <p>Total USDTs received at your level 3 (2%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel3, 6)).toLocaleString()}</p>
                  <p>Total USDTs received at your level 4 (1%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel4, 6)).toLocaleString()}</p>
                  <p>Total USDTs received at your level 5 (1%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel5, 6)).toLocaleString()}</p>
                  <p>Total USDTs received at your level 6 (1%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel6, 6)).toLocaleString()}</p>
                  <p>Total USDTs received at your level 7 (1%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel7, 6)).toLocaleString()}</p>
                  <p>Total USDTs received at your level 8 (1%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel8, 6)).toLocaleString()}</p>
                  <p>Total USDTs received at your level 9 (0.50%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel9, 6)).toLocaleString()}</p>
                  <p>Total USDTs received at your level 10 (0.50%): ${Number(ethers.formatUnits(userAmountUsdtPerLevel10, 6)).toLocaleString()}</p>




                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero 