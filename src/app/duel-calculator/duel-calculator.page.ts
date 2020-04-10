import { Component } from '@angular/core';
import { SettingsPage} from '../settings/settings.page';
import {Router} from '@angular/router';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-duel-calculator',
  templateUrl: 'duel-calculator.page.html',
  styleUrls: ['duel-calculator.page.scss']
})
export class DuelCalculatorPage {

  constructor(private settings: SettingsPage,
              public router: Router,
              private screenOrientation: ScreenOrientation) {
    settings.getData();
  }

  ionViewWillEnter(){
    this.settings.getData();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  goDuel() {
    this.router.navigate(['./duel-screen']);
  }


}
