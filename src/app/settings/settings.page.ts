import {Component, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonReorderGroup} from '@ionic/angular';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})


export class SettingsPage {

    @ViewChild(IonReorderGroup, {static: false}) reorderGroup: IonReorderGroup;

    public playerOptions = [
        {player: '1 Player', amount: 1},
        {player: '2 Players', amount: 2},
        {player: '3 Players', amount: 3},
        {player: '4 Players', amount: 4}
    ];

    // Default values for first boot
    public playerAmount: number = 2;
    public lifePoints: number = 8000;
    public timeLimit: number = 30;
    public teamsEnabled: boolean = false;
    public timeLimitEnabled: boolean = false;
    public names = [
        {playerId: 1, name: 'Duelist 1', team: 1, lifePoints: 0},
        {playerId: 2, name: 'Duelist 2', team: 1, lifePoints: 0},
        {playerId: 3, name: 'Duelist 3', team: 2, lifePoints: 0},
        {playerId: 4, name: 'Duelist 4', team: 2, lifePoints: 0}
    ];

    constructor(public storage: Storage) {
    }

    ionViewWillEnter() {
        this.getData();
    }

    getData() {
        this.storage.get('playerAmount').then(data => {
            if (data != null) {
                this.playerAmount = data;
            }
        });

        this.storage.get('lifePoints').then(data => {
            if (data != null) {
                this.lifePoints = data;
            }
        });

        this.storage.get('timeLimit').then(data => {
            if (data != null) {
                this.timeLimit = data;
            }
        });

        this.storage.get('names').then(data => {
            if (data != null) {
                this.names = data;
            }
        });

        this.storage.get('teamsEnabled').then(data => {
            if (data != null) {
                this.teamsEnabled = data;
            }
        });

        this.storage.get('timeLimitEnabled').then(data => {
            if (data != null) {
                this.timeLimitEnabled = data;
            }
        });
    }


    setPlayers(event: any) {
        this.playerAmount = event.target.value;

        if (this.playerAmount != 4) {
            this.sortNames();
            this.enableTeams({target: {value: false}});
        }

        this.storage.set('playerAmount', this.playerAmount);

        this.unlockSorting();
    }

    setName(event: any, playerId: number) {
        this.names[playerId - 1].name = event.target.value;
        this.storage.set('names', this.names);
    }

    setLifePoints(event: any) {
        const lp = event.target.value;
        if (lp == '' || lp == undefined || lp[0] == 0) {
            this.lifePoints = 1;
        } else {
            this.lifePoints = parseInt(lp);
        }
        this.storage.set('lifePoints', this.lifePoints);
    }

    setTimeLimit(event: any) {
        let time = +event.target.value;
        if (time < 5) {
            this.timeLimit = 5;
        } else {
            this.timeLimit = time;
        }
        this.storage.set('timeLimit', this.timeLimit);
    }

    enableTeams(event: any) {
        this.teamsEnabled = event.target.checked;

        if (!event.target.checked) {
            this.sortNames();
        }

        this.unlockSorting();
        this.storage.set('teamsEnabled', this.teamsEnabled);
    }

    enableTimeLimit(event: any) {
        this.timeLimitEnabled = event.target.checked;
        this.storage.set('timeLimitEnabled', this.timeLimitEnabled);
    }

    sortTeam(ev: any) {
        let playerToMove = this.names.splice(ev.detail.from, 1)[0];
        this.names.splice(ev.detail.to, 0, playerToMove);
        ev.detail.complete();

        for (let i = 0; i < this.names.length; i++) {
            if (i <= 1) {
                this.names[i].team = 1;
            } else {
                this.names[i].team = 2;
            }
        }
        this.storage.set('names', this.names);
    }

    unlockSorting() {
        this.reorderGroup.disabled = !(this.playerAmount == 4 && this.teamsEnabled);
    }

    sortNames() {
        this.names = this.names.sort((a, b) => (a.playerId > b.playerId) ? 1 : -1);
        this.storage.set('names', this.names);
    }

}
