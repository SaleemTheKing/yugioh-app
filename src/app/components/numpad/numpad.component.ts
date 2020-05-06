import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PlayerService} from '../../services/player/player.service';
import {DuelScreenPage} from '../../duel-screen/duel-screen.page';


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

    calculate() {
        let duelist = this.player;
        let digits = parseInt(this.digitString);
        if (this.operationString == '+') {
            duelist.lifePoints += digits;
        } else if (this.operationString == '-') {
            duelist.lifePoints -= digits;
        } else if (this.operationString == '/') {
            duelist.lifePoints = Math.round((duelist.lifePoints / digits));
        }
        if (duelist.lifePoints < 0) {
            duelist.lifePoints = 0;
        }
        for (let i = 0; i < this.duelScreenPage.players[i].length; i++) {
            if (this.duelScreenPage.players[i].playerId == duelist.playerId) {
                this.duelScreenPage.players[i] = duelist;
                break;
            }
        }
        this.modalCtrl.dismiss().then(window => {
                let infoPanels = document.getElementsByClassName('info');
                for (let i = 0; i < infoPanels.length; i++) {
                    if (duelist.lifePoints == infoPanels[i].innerHTML) {
                        if (duelist.lifePoints.toString().length <= 4) {
                            infoPanels[i].style.fontSize = '3.3rem';
                        } else if (duelist.lifePoints.toString().length == 5) {
                            infoPanels[i].style.fontSize = '3rem';
                        } else if (duelist.lifePoints.toString().length >= 6) {
                            infoPanels[i].style.fontSize = '2.5rem';
                        }
                    }
                }
            }
        );
    }

}
