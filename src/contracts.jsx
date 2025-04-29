import { defineChain } from "thirdweb";
import { client } from "./client";
import { getContract } from "thirdweb";
import { usdtABI } from "./abis/usdt";
import { icoABI } from "./abis/ico";
const chain = defineChain(137)


export const USDTAddress = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
export const IcoAddress = "0xE6749a56BB04bca7F9537CDE108A3160f17676Ee";


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