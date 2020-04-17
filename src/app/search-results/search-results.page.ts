import {Component, OnInit} from '@angular/core';
import {CardslistService} from '../services/cardslist/cardslist.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {CardDetailsComponent} from '../components/card-details/card-details.component';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.page.html',
    styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {

    public list;

    constructor(public cardList: CardslistService,
                public loadCtrl: LoadingController,
                public modalCtrl: ModalController,) {
        this.list = this.cardList.cardsList;
    }

    async load() {
        let loading = await this.loadCtrl.create({
            spinner: 'bubbles',
            message: 'Getting cards...'
        });
        await loading.present();
    }

    ngOnInit() {
    }

    async openCard(card: any) {
        const modal = await this.modalCtrl.create({
            component: CardDetailsComponent,
            componentProps: {'card': card},
            cssClass: 'modalxl'
        });
        return await modal.present();
    }

}
