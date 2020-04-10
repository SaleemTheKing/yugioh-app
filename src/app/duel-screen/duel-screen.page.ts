import {Component, OnInit} from '@angular/core';
import {SettingsPage} from '../settings/settings.page';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {ModalController} from '@ionic/angular';
import {NumpadComponent} from '../numpad/numpad.component';
import {PlayerService} from '../player.service';
import {NumpadUpsidedownComponent} from '../numpad-upsidedown/numpad-upsidedown.component';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-duel-screen',
    templateUrl: './duel-screen.page.html',
    styleUrls: ['./duel-screen.page.scss'],
})
export class DuelScreenPage implements OnInit {

    players: any;

    constructor(private settings: SettingsPage,
                private screenOrientation: ScreenOrientation,
                public modalCtrl: ModalController,
                public playerService: PlayerService,
                public alertController: AlertController) {
        settings.getData();
        this.setupGame();
    }

    setupGame() {
        this.players = this.settings.names;
        for (let i = 0; i < this.settings.playerAmount; i++) {
            this.players[i].lifePoints = this.settings.lifePoints;
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
                        for (let i = 0; i < this.settings.playerAmount; i++) {
                            this.players[i].lifePoints = this.settings.lifePoints;
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    rollDice() {
        console.log("TODO");
    }

    ionViewWillEnter() {
        this.settings.getData();
        this.setupGame();
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
