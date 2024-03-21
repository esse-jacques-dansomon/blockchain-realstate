import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EscrowService} from "../../services/escrow.service";
import {RealStateService} from "../../services/realstate.service";

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
})
export class PropertyDetailsComponent {
  inspector: any;
  lender: any;
  account: any;
  seller: any;

  buyer: any;
  owner: any;

  hasInspected: any ;
  hasLended: any;
  hasSold: any;
  hasBought: any;

  constructor(
    public dialogRef: MatDialogRef<PropertyDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private escrowService: EscrowService,
    private realStateService: RealStateService
  ) {
    console.log('user', data.user)
    console.log('data', data.data)

    this.account = data.user
    console.log('account', this.account)

    this.escrowService.getContract().then(async (contract: any) => {
      console.log(contract)
      this.lender = await contract['lender']();
      console.log('lender', this.lender)
      this.seller = await contract['seller']();
      console.log('seller', this.seller)
      this.inspector = await contract['inspector']();
      console.log('inspector', this.inspector)
      this.buyer = await contract['buyer'](data.data.id);
      console.log('buyer', this.buyer)



      this.hasInspected = await contract['inspectionPassed'](data.data.id);
      console.log('hasInspected', this.hasInspected)
      this.hasLended = await contract['approval'](data.data.id, this.lender);
      console.log('hasLended', this.hasLended)
      this.hasSold = await contract['approval'](data.data.id, this.seller);
      console.log('hasSold', this.hasSold)
      this.hasBought = await contract['approval'](data.data.id, this.buyer);
      console.log('hasBought', this.hasBought)

      if (await contract['isListed'](data.data.id)) return
      this.owner = await contract['buyer'](data.data.id);
      console.log('owner', this.owner)
    })




  }

  onNoClick() {
    this.dialogRef.close();
  }

  async inspectHandler()  {
    const signer = await this.escrowService.getSigner();
    const id = this.data.data.id
    const contract = await this.escrowService.getContract()
    const transaction = await contract.connect(signer)['updateInspectionStatus'](
      id,
      true
    )
    await transaction.wait()

    this.hasInspected = true
  }

  async lendHandler() {
    const signer = await this.escrowService.getSigner();
    const id = this.data.data.id
    const contract = await this.escrowService.getContract()

    //approveSale
    const transaction = await contract.connect(signer)['approveSale'](id)
    await transaction.wait()

    //Lender sends money to escrow
    const lendAmount = (await contract['purchasePrice'](id) - await contract['escrowAmount'](id))
    await signer.sendTransaction({
      to: contract.address,
      value: lendAmount.toString(),
      gasLimit: 60000,
    })

    this.hasLended = true
  }

  async sellHandler() {
    const signer = await this.escrowService.getSigner();
    const id = this.data.data.id
    const contract = await this.escrowService.getContract()
    // Seller approves sale...
    let transaction = await contract.connect(signer)['approveSale'](id)
    await transaction.wait()

    // Seller finalizes sale...
    transaction = await contract.connect(signer)['finalizeSale'](id)
    await transaction.wait()

    this.hasSold = true

  }

  async buyHandler() {
    const signer = await this.escrowService.getSigner();
    console.log('signer', signer)
    const id = this.data.data.id
    const contract = await this.escrowService.getContract()
    const escrowAmount = await contract['escrowAmount'](id)
    console.log('escrowAmount', escrowAmount.toString())
    console.log(contract)

    // Buyer depot earnest
    let transaction = await contract.connect(signer)['depositEarnest'](id,
      {value: '1'})
    await transaction.wait()

    console.log('escrowAmount', escrowAmount.toString())
    // Buyer approves sale...
    transaction = await contract.connect(signer)['approveSale'](id)
    await transaction.wait()

    // Buyer finalizes sale...
    this.hasBought = true
  }
}
