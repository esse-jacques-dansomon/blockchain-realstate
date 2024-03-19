import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
})
export class PropertyDetailsComponent {
  owner: any;
  inspector: any;
  hasInspected: any;
  lender: any;
  account: any;
  seller: any;
  hasLended: any;
  hasSold: any;
  hasBought: any;

  constructor(
    public dialogRef: MatDialogRef<PropertyDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }

  inspectHandler() {

  }

  lendHandler() {

  }

  sellHandler() {

  }

  buyHandler() {

  }
}
