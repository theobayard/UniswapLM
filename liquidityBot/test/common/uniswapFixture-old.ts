// import completeFixture from "@uniswap/v3-periphery-tests/test/shared/completeFixture";
// import { expandTo18Decimals } from "@uniswap/v3-periphery-tests/test/shared/expandTo18Decimals"
// import { Fixture } from "ethereum-waffle";
// import { constants } from 'ethers';
// import { FeeAmount } from '@uniswap/v3-periphery-tests/test/shared/constants'
// import { encodePriceSqrt } from '@uniswap/v3-periphery-tests/test/shared/encodePriceSqrt'

// /**
//  * A Fixture that sets up basic uniswap architecture needed to test contracts
//  */
// const uniswapFixture: Fixture<{
//     nft: any
//     factory: any
//     tokens: [any, any, any]
//     weth9: any
//     router: any
//   }> = async (wallets, provider) => {
//     const { weth9, factory, tokens, nft, router } = await completeFixture(wallets, provider)
//     const other = wallets[1];

//     // approve & fund wallets
//     for (const token of tokens) {
//       await token.approve(nft.address, constants.MaxUint256)
//       await token.connect(other).approve(nft.address, constants.MaxUint256)
//       await token.transfer(other.address, expandTo18Decimals(1_000_000))
//     }

//     // Confirm that nft manager has a pool between t0 and t1
//     await nft.createAndInitializePoolIfNecessary(
//       tokens[0].address,
//       tokens[1].address,
//       FeeAmount.MEDIUM,
//       encodePriceSqrt(1, 1)
//     )

//     return {
//       nft,
//       factory,
//       tokens,
//       weth9,
//       router,
//     }
// }
// export default uniswapFixture;