import { Component } from '@angular/core';
import { SettingsPage} from '../settings/settings.page';
import {Router} from '@angular/router';

@Component({
  selector: 'app-duel-calculator',
  templateUrl: 'duel-calculator.page.html',
  styleUrls: ['duel-calculator.page.scss']
})
export class DuelCalculatorPage {

  constructor(public settings: SettingsPage,
              public router: Router,) {
    settings.getData();
  }

  ionViewWillEnter(){
    this.settings.getData();
  }

  goDuel() {
    this.router.navigate(['./duel-screen']);
  }


}
