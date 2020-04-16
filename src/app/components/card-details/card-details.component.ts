import {Component, OnInit} from '@angular/core';
import {NavParams} from '@ionic/angular';

@Component({
    selector: 'app-card-details',
    templateUrl: './card-details.component.html',
    styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {

    card: any;


    constructor(navParams: NavParams) {
        this.card = navParams.get('card');
        console.log(this.card);
    }

    ngOnInit() {
    }

}
