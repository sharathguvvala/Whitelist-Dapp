import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Web3Modal from "web3modal"
import { Contract, providers } from 'ethers'
import { ABI, WHITELIST_CONTRACT_ADDRESS } from '../constants'

export default function Home() {

  const [walletConnected,setWalletConnected] = useState(false)

  const [joinedWhitelist,setJoinedWhitelist] = useState(false)

  const [loading,setLoading] = useState(false)

  const [numOfWhitelisted,setNumOfWhitelisted] = useState(0)

  const web3ModalRef = useRef()

  const getSignerOrProvider = async (needSigner = false) => {
    try{
      const provider = await web3ModalRef.current.connect()
      const web3Provider = new providers.Web3Provider(provider)
      const {chainId} = await web3Provider.getNetwork()
      if(chainId!==3){
        window.alert("Change the network to Ropsten!")
      }
      if(needSigner){
        const signer = web3Provider.getSigner()
        return signer
      }
      return web3Provider
    }
    catch(error){
      console.log(error)
    }
  }

  const addAddressTOWhitelist = async () => {
    try{
      const signer =await getSignerOrProvider(true)
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        ABI,
        signer
      )
      const tnx = await whitelistContract.addAddressToWhitelist()
      setLoading(true)
      await tnx.wait()
      setLoading(false);
      await getNumOfWhitelisted()
      setJoinedWhitelist(true)
    }
    catch(error){
      console.log(error)
    }
  }

  const getNumOfWhitelisted = async () => {
    try{
      const provider = await getSignerOrProvider()
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        ABI,
        provider
      )
      const _numOfWhitelisted = await whitelistContract.numAddressesWhitelisted()
      setNumOfWhitelisted(_numOfWhitelisted)
    }
    catch(error){
      console.log(error)
    }
  }

  const checkIfAddressIsWhitelisted = async () => {
    try{
      const signer = getSignerOrProvider(true)
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        ABI,
        signer
      )
      const address = await signer.getAddress()
      const _joinedWhitelist = await whitelistContract.whitelistedAddresses(address)
      setJoinedWhitelist(_joinedWhitelist)
    }
    catch(error){
      console.log(error)
    }
  }

  const connectWallet = async () => {
    try{
      await getSignerOrProvider()
      setWalletConnected(true)
      checkIfAddressIsWhitelisted()
      getNumOfWhitelisted()
    }
    catch(error){
      console.log(error)
    }
  }

  const renderButton = () => {
    if(walletConnected){
      if(joinedWhitelist){
        return (
          <div className={styles.description}>
            Thanks for joining the Whitelist!
          </div>
        )
      }
      else if(loading){
        return (
          <button className={styles.button}>Loading...</button>
        )
      }
      else{
        return (
          <button onClick={addAddressTOWhitelist} className={styles.button}>
            Join the Whitelist
          </button>
        )
      }
    }
    else{
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your Wallet
        </button>
      )
    }
  }

  useEffect(()=>{
    if(!walletConnected){
      web3ModalRef.current = new Web3Modal({
        network: "ropsten",
        providerOptions: {},
        disabledInjectedProvider: false,
      })
      connectWallet()
    }
  },[walletConnected])


  return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name='description' content='Whitelist-Dapp' />
      </Head>
      <div className={styles.main}>
      <div>
          <h1 className={styles.title}>Welcome to Web3 Devs!</h1>
          <div className={styles.description}>
            Its an NFT collection for developers in Web3.
          </div>
          <div className={styles.description}>
            {numOfWhitelisted} have already joined the Whitelist
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src="./web3-devs.svg" />
        </div>
      </div>
      <footer className={styles.footer}>
        Made with &#9829; by Web3 Devs!
      </footer>
    </div>
  )
}
