import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../player.service';
import {ModalController} from '@ionic/angular';
import {DuelScreenPage} from '../duel-screen/duel-screen.page';

@Component({
  selector: 'app-numpad-upsidedown',
  templateUrl: './numpad-upsidedown.component.html',
  styleUrls: ['./numpad-upsidedown.component.scss'],
})
export class NumpadUpsidedownComponent implements OnInit {

  player: any;
  digitString: string = '';
  operationString: string = '';

  keyEnabled: boolean = false;
  zerosEnabled: boolean = false;
  operatorsEnabled: boolean = true;

  constructor(public playerService: PlayerService,
              private modalCtrl: ModalController,
              private duelScreenPage: DuelScreenPage) {
    this.player = this.playerService.selectedPlayer;
  }

  ngOnInit() {
  }

  key(digit) {
    this.digitString += digit;
    this.zerosEnabled = true;
  }

  setOperator(op) {
    this.operationString = op;
    this.operatorsEnabled = false;
    this.keyEnabled = true;
  }

  deleteOperator() {
    this.operationString = '';
    this.operatorsEnabled = true;
    this.zerosEnabled = false;
    this.keyEnabled = false;
  }

  deleteCharacter() {
    if (this.digitString.length == 0) {
      this.deleteOperator();
    }
    this.digitString = this.digitString.slice(0, -1);
  }

  calculate(){
    let duelist = this.duelScreenPage.players[this.player.playerId - 1];
    let digits = parseInt(this.digitString);
    if (this.operationString == '+') {
      duelist.lifePoints += digits;
    } else if (this.operationString == '-') {
      duelist.lifePoints -= digits;
    } else if (this.operationString == '/') {
      duelist.lifePoints = Math.round((duelist.lifePoints / digits));
    }
    this.duelScreenPage.players[this.player.playerId - 1].lifePoints = duelist.lifePoints;
    this.modalCtrl.dismiss(duelist);
  }

}
