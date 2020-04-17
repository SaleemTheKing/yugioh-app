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
    this.test();
  }

  goDuel() {
    this.router.navigate(['./duel-screen']);
  }

  test() {
    console.log("Dark MODE:", window.matchMedia('(prefers-color-scheme: no-preference)').matches);
  }


}
