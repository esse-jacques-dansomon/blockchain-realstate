import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {RealStateService} from "./services/realstate.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class AppComponent {
  title = 'angular-dapp';
  account = ''

  constructor(
    private realStateService: RealStateService,
    private cdr: ChangeDetectorRef,
  ) {
    this.realStateService.getAccountBySigner().then((account) => {
      console.log('account getAccountBySigner', account)
      this.account = account[0]
    });

    (window as any).ethereum.on('accountsChanged',(accounts: any) =>{
      console.log('accountsChanged', accounts)
      this.account = accounts[0]
      this.cdr.detectChanges()
    })
  }


  connectHandler() {

  }
}
