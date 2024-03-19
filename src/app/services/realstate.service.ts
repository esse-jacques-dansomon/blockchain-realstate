import {Injectable} from '@angular/core';
import {ethers} from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import {environment} from "../../environments/environment";
import RealEstate from '../../../artifacts/contracts/RealEstate.sol/RealEstate.json'
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RealStateService {
  constructor(
    private http: HttpClient
  ) {
  }


  public async getAccountBySigner(): Promise<any[]> {
    const contract = await RealStateService.getWebProvider()
    return await contract.listAccounts()
  }

  public async getAllProperties(): Promise<any> {
    const contract = await RealStateService.getContract()
    const totalSupply = await contract['totalSupply']()
    const network = await contract.provider.getNetwork()
    const properties: Object[] = []
    for (let i = 0; i < totalSupply; i++) {
      const uri = await contract['tokenURI'](i + 1)
      const property = this.http.get(uri)
      property.subscribe((data) => {
        properties.push(data)
      });
    }
    console.log('properties', properties)
    return properties
  }

  static async getContract(bySigner = false) {
    const provider = await RealStateService.getWebProvider()
    const address = environment.realEstate.address
    return new ethers.Contract(
      address,
      RealEstate.abi,
      provider,
    )
  }

  private static async getWebProvider(requestAccounts = true) {
    const provider: any = await detectEthereumProvider()

    if (requestAccounts) {
      await provider.request({method: 'eth_requestAccounts'})
    }

    return new ethers.providers.Web3Provider(provider)
  }
}
