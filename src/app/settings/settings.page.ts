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

  playerOptions = [
    {player: '1 Player', amount: 1},
    {player: '2 Players', amount: 2},
    {player: '3 Players', amount: 3},
    {player: '4 Players', amount: 4}
  ];

  // Default values for first boot
  playerAmount: number = 2;
  lifePoints = 8000;
  timeLimit: number = 180;
  teamsEnabled: boolean = false;
  names = [
      {playerId: 1, name: 'Duelist 1', team: 1},
      {playerId: 2, name: 'Duelist 2', team: 1},
      {playerId: 3, name: 'Duelist 3', team: 2},
      {playerId: 4, name: 'Duelist 4', team: 2}
  ];

  constructor(public storage: Storage) {
  }

  ionViewWillEnter()  {
    this.getData();
  }

  getData() {
    this.storage.get('playerAmount').then(data => {
      if(data != null) {
        this.playerAmount = data
      }
    });

    this.storage.get('lifePoints').then(data => {
      if(data != null) {
        this.lifePoints = data
      }
    });

    this.storage.get('timeLimit').then(data => {
      if(data != null) {
        this.timeLimit = data
      }
    });

    this.storage.get('names').then(data => {
      if(data != null) {
        this.names = data
      }
    });

    this.storage.get('teamsEnabled').then(data => {
      if(data != null) {
        this.teamsEnabled = data
      }
    });
  }


  setPlayers(event: any) {
   this.playerAmount = event.target.value;
   this.storage.set('playerAmount', this.playerAmount);
  }

  setName(event:any, playerId: number) {
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
    let time = event.target.value;
    if (time < 60) {
      this.timeLimit = 60;
    } else {
      this.timeLimit = time;
    }
    this.storage.set('timeLimit', this.timeLimit);
  }

  setTeam(event: any) {
    this.teamsEnabled = event.target.checked;
    this.storage.set('teamsEnabled', this.teamsEnabled);
  }
}
