import {Component, OnInit, ViewChild} from '@angular/core';
import {SettingsPage} from '../settings/settings.page';
import {AlertController, ModalController} from '@ionic/angular';
import {NumpadComponent} from '../numpad/numpad.component';
import {PlayerService} from '../player.service';
import {NumpadUpsidedownComponent} from '../numpad-upsidedown/numpad-upsidedown.component';
import {CountdownComponent} from 'ngx-countdown';

@Component({
    selector: 'app-duel-screen',
    styleUrls: ['./duel-screen.page.scss'],
    templateUrl: './duel-screen.page.html',
})


export class DuelScreenPage implements OnInit {


    players: any;
    seconds: number = 0;
    @ViewChild('timer', {static: false}) private countdown: CountdownComponent;

    constructor(public settings: SettingsPage,
                public modalCtrl: ModalController,
                public playerService: PlayerService,
                public alertController: AlertController,) {
        settings.getData();
        this.setupGame();
    }

    setupGame() {
        this.players = this.settings.names;
        for (let i = 0; i < this.settings.playerAmount; i++) {
            this.players[i].lifePoints = this.settings.lifePoints;
        }
        if (this.settings.timeLimitEnabled) {
            this.setTimer();
        }
    }

    setTimer() {
        this.seconds = this.settings.timeLimit * 60;
    }

    resetTimer() {
        this.countdown.restart();
        document.getElementById('timer').classList.remove('timer--expired');
    }

    alert(ev: any) {
        if (ev.action == 'done') {
            document.getElementById('timer').classList.add('timer--expired');
        }
    }

    async openCalculator(player) {
        this.playerService.selectedPlayer = player;
        const modal = await this.modalCtrl.create({
            component: NumpadComponent,
            cssClass: 'modal'
        });
        modal.onDidDismiss()
            .then((data) => {
                if (data.data != null) {
                    this.players[player.playerId - 1] = data.data;
                }
            });
        return await modal.present();
    }

    async openCalculatorUpsideDown(player) {
        this.playerService.selectedPlayer = player;
        const modal = await this.modalCtrl.create({
            component: NumpadUpsidedownComponent,
            cssClass: 'modalUpsideDown'
        });
        modal.onDidDismiss()
            .then((data) => {
                if (data.data != null) {
                    this.players[player.playerId - 1] = data.data;
                }
            });
        return await modal.present();
    }

    async restartGame() {
        const alert = await this.alertController.create({
            header: 'Reset LP?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                }, {
                    text: 'Yes',
                    handler: () => {
                        this.setupGame();
                        this.resetTimer();
                    }
                }
            ]
        });
        await alert.present();
    }

    async rollDice(duelistName: string) {
        let roll = 1 + Math.floor(Math.random() * 6);

        const alert = await this.alertController.create({
            header: duelistName + ' rolled: ' + roll,
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel'
                }
            ],
        });
        await alert.present();
    }

    async coinFlip(duelistName: string) {
        let coin = Math.round(Math.random());
        let result;
        if (coin == 1) {
            result = 'Tails';
        } else {
            result = 'Heads';
        }

        const alert = await this.alertController.create({
            header: duelistName + ' tossed: ' + result,
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel'
                }
            ],
        });
        await alert.present();
    }

    ionViewWillEnter() {
        this.settings.getData();
        this.setupGame();
    }

    ngOnInit() {
    }

}
