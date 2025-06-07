import { defineChain } from "thirdweb";
import { client } from "./client";
import { getContract } from "thirdweb";
import { usdtABI } from "./abis/usdt";
import { icoABI } from "./abis/ico";
const chain = defineChain(137)


export const USDTAddress = "0x6a0db1AB91c42611A587d06aF8167da7D85B6496"; //0xc2132d05d31c914a87c6611c10748aeb04b58e8f
export const IcoAddress = "0x2E49Ff2380a15Fd1640E19348D043Aa81949BeCD"; 


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