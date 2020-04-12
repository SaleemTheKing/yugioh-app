import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PlayerService} from '../player.service';
import {DuelScreenPage} from '../duel-screen/duel-screen.page';


@Component({
    selector: 'app-numpad',
    templateUrl: './numpad.component.html',
    styleUrls: ['./numpad.component.scss'],
})
export class NumpadComponent implements OnInit {

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
        if(duelist.lifePoints < 0) {
            duelist.lifePoints = 0;
        }
        this.duelScreenPage.players[this.player.playerId - 1].lifePoints = duelist.lifePoints;
        this.modalCtrl.dismiss(duelist);
    }

}
