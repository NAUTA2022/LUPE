import { defineChain } from "thirdweb";
import { client } from "./client";
import { getContract } from "thirdweb";
import { usdtABI } from "./abis/usdt";
import { icoABI } from "./abis/ico";
const chain = defineChain(137)


export const USDTAddress = "0xeec71974dbe89de6d56518dc72a7d2c526afaeec";
export const IcoAddress = "0xad8c57013f2ec360832d531805afcd84ef43b6f9";


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