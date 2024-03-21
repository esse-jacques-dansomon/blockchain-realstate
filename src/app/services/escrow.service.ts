import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {ethers} from "ethers";
import Escrow from "../../../artifacts/contracts/Escrow.sol/Escrow.json";
import detectEthereumProvider from "@metamask/detect-provider";

@Injectable({
  providedIn: 'root'
})
export class EscrowService {

  constructor() { }

  static async getContract(bySigner=false) {
    const provider = await EscrowService.getWebProvider()
    const signer = provider.getSigner()

    const address = environment.escrow.address

    return new ethers.Contract(
      address,
      Escrow.abi,
      provider,
    )
  }

  private static async getWebProvider(requestAccounts = true) {
    const provider: any = await detectEthereumProvider()

    if (requestAccounts) {
      await provider.request({ method: 'eth_requestAccounts' })
    }
    return new ethers.providers.Web3Provider(provider)
  }


  async getContract() {
   return await EscrowService.getContract();
  }


  async inspectHandler(id: number) {
    const provider = await EscrowService.getWebProvider()
    const signer = provider.getSigner()

    const contract = await EscrowService.getContract()
    const transaction = await contract.connect(signer)['updateInspectionStatus'](
      1,
      true
    )
    await transaction.wait()

  }

  lendHandler() {

  }

  sellHandler() {

  }

  buyHandler() {

  }

  async getSigner() {
   return   await EscrowService.getWebProvider().then((provider) => {
      return provider.getSigner()
     });
  }
}
