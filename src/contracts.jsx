import { defineChain } from "thirdweb";
import { client } from "./client";
import { getContract } from "thirdweb";
import { usdtABI } from "./abis/usdt";
import { icoABI } from "./abis/ico";
const chain = defineChain(56)


export const USDTAddress = "0xF68689779CA75bdD8313DcdEC1DAd35D087BB98F"; 
export const IcoAddress = "0x6a0db1AB91c42611A587d06aF8167da7D85B6496"; 


export const ICO = getContract({
    client: client,
    address: IcoAddress,
    chain: chain,
    abi: icoABI
})

export const USDT = getContract({
    client: client,
    address: USDTAddress,
    chain: chain,
    abi: usdtABI
})