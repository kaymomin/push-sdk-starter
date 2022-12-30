import { Button, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 37, 80001],
})

const Auth = () => {
    const {active, account, activate} = useWeb3React()
    const {isConnected, isDisconnected} = useAccount()
    const {disconnect} = useDisconnect()

    async function connect() {
        try{
        await activate(injected)
        console.log(injected)
        }
        catch(err)
        {
        console.log(err)
        }

        
    }
    return (
        <div>
            {active && isConnected ? (
                <div>
                <Text fontSize='xl'>Connected with: <br></br>
                 {account}
                 </Text>
                {active && isConnected ? 
                <Button onClick={()=> disconnect()} colorScheme='messenger'>Disconnect Metamask</Button>
                : isDisconnected}
                </div>
        ): (
            <>
            <div >
            <ConnectButton/>
            <br></br>
            {isConnected ?
            
            <Button onClick={()=> connect()} colorScheme='messenger'>Enter Page</Button>
        : null}
        </div>
        </>
        
        )  
                }
        </div>
    )};


export default Auth;