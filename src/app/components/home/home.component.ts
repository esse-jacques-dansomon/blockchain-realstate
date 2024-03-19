import { Component, OnInit } from '@angular/core';
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
  trackByFn = (index: number, item: any) => index;

  constructor(
    private realStateService: RealStateService,
    public dialog: MatDialog
  ) {
    this.realStateService.getAllProperties().then((properties) => {
      console.log("realstate", properties)
      this.properties = properties
    })
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(PropertyDetailsComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
