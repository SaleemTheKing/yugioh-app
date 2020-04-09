import { Component, OnInit } from '@angular/core';
import { SettingsPage } from '../settings/settings.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-duel-screen',
  templateUrl: './duel-screen.page.html',
  styleUrls: ['./duel-screen.page.scss'],
})
export class DuelScreenPage implements OnInit {

  constructor( private settings: SettingsPage,
              private screenOrientation: ScreenOrientation,) {
    settings.getData();
  }

  ionViewWillEnter() {
    this.settings.getData();
    if (this.settings.playerAmount > 2) {
       this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
  }

  ionViewWillLeave() {
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ngOnInit() {
  }

}
