import { Component } from '@angular/core';
import {RealStateService} from "../../services/realstate.service";
import {MatDialog} from "@angular/material/dialog";
import {PropertyDetailsComponent} from "../property-details/property-details.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  public properties: any[] = []
  public user = null;
  trackByFn = (index: number, item: any) => index;

  constructor(
    private realStateService: RealStateService,
    public dialog: MatDialog
  ) {
    this.realStateService.getAllProperties().then((properties) => {
      this.properties = properties
    });

    this.realStateService.getAccountBySigner().then((account) => {
      console.log('account',account)
      this.user = account[0]
    });

     (window as any).ethereum.on('accountsChanged',(accounts: any) =>{
        this.user = accounts[0]
      });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(PropertyDetailsComponent, {
      data: {
        data: data,
        user: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
