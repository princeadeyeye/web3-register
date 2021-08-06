import { ethers } from 'ethers'
import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from '../artifacts/contract';

export async function requestAccount() {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return account;
  }

  // call the smart contract, read the current data value
  export async function getContractProfile(address) {
      console.log(`fetching contract for address ${address}`);
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(SMART_CONTRACT_ADDRESS, SMART_CONTRACT_ABI, provider)
      try {
        const data = await contract.getProfile(address);
        return data;
      } catch (err) {
        alert(err.code)
        return err      }
    } 
    else alert("instal metamask") 
  }

  export async function getAllProfiles(address) {
    console.log(`fetching contract for address ${address}`);
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(SMART_CONTRACT_ADDRESS, SMART_CONTRACT_ABI, provider)
    try {
      const data = await contract.Profiles(SMART_CONTRACT_ADDRESS)
      console.log(data, "users")
      return data
    } catch (err) {
      console.log("Error: ", err)
      alert(err.code)
      return err
    }
  }   
  else alert("instal metamask") 
}


  // call the smart contract, send an update
  export async function createProfile(data) {
    if (!data) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(SMART_CONTRACT_ADDRESS, SMART_CONTRACT_ABI, signer)
      let tx = {
        value: ethers.utils.parseEther('0.01')
    }
     const transaction = await contract.createProfile(data.lastname, data.firstname, tx)
        await transaction.wait()
        await getAllProfiles()
    }
    else alert("instal metamask") 
  }
