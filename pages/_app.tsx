import '../styles/globals.css'
import type { AppProps } from 'next/app';
import "@rainbow-me/rainbowkit/styles.css";
import {getDefaultWallets,RainbowKitProvider} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from '@chakra-ui/react';
import { ethers } from "ethers";
import { Web3ReactProvider } from '@web3-react/core';
import { mainnet, goerli } from 'wagmi/chains'

const { chains, provider } = configureChains(
  [goerli],
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: "https://rpc.ankr.com/eth_goerli",
        };
      },
    }),
    publicProvider(),
  ]
);

const {connectors} = getDefaultWallets(
  {
    appName: 'Enter Project Name',
    chains,
  });

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

function getLibrary(provider: any){
  const gottenProvider = new ethers.providers.Web3Provider(provider,"any");
  return gottenProvider;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WagmiConfig client={wagmiClient}>
        <ChakraProvider>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </ChakraProvider>
      </WagmiConfig>
    </Web3ReactProvider>
  )
}