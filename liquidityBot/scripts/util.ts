import { ethers } from "ethers";
import addresses from "../addresses.config";


export const alchemyProvider = new ethers.providers.JsonRpcProvider(
    addresses.alchemyLink
);