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

  public async getAllEscrow(): Promise<any> {
    const contract = await EscrowService.getContract()
    return await contract['totalSupply']()
  }

  static async getContract(bySigner=false) {
    const provider = await EscrowService.getWebProvider()
    const address = environment.escrow.address
    const signer = provider.getSigner()

    return new ethers.Contract(
      address,
      Escrow.abi,
      bySigner ? signer : provider,
    )
  }

  private static async getWebProvider(requestAccounts = true) {
    const provider: any = await detectEthereumProvider()

    if (requestAccounts) {
      await provider.request({ method: 'eth_requestAccounts' })
    }

    return new ethers.providers.Web3Provider(provider)
  }
}
