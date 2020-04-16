import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {String} from 'typescript-string-operations';
import {LoadingController} from '@ionic/angular';
import {CardslistService} from '../cardslist.service';

@Component({
    selector: 'app-card-search',
    templateUrl: 'card-search.page.html',
    styleUrls: ['card-search.page.scss']
})
export class CardSearchPage {

    monsterFrame = [
        {frame: 'All', query: 'All'},
        {frame: 'Normal', query: 'Normal Monster'},
        {frame: 'Effect', query: 'Effect Monster'},
        {frame: 'Fusion', query: 'Fusion Monster'},
        {frame: 'Ritual', query: 'Ritual Monster'},
        {frame: 'Synchro', query: 'Synchro Monster'},
        {frame: 'Xyz', query: ' XYZ Monster'},
        {frame: 'Pendulum', query: 'Monster'},
        {frame: 'Link', query: 'Link Monster'},
        {frame: 'Tuner', query: 'Tuner Monster'},
        {frame: 'Gemini', query: 'Gemini Monster'},
        {frame: 'Union', query: 'Union Effect Monster'},
        {frame: 'Spirit', query: 'Spirit Monster'},
        {frame: 'Flip', query: 'Flip Monster'},
        {frame: 'Toon', query: 'Toon Monster'},
    ];

    monsterAttribute = [
        {attribute: 'All'},
        {attribute: 'EARTH'},
        {attribute: 'WATER'},
        {attribute: 'FIRE'},
        {attribute: 'WIND'},
        {attribute: 'LIGHT'},
        {attribute: 'DARK'},
        {attribute: 'DIVINE'},
    ];

    monsterType = [
        {type: 'Warrior'},
        {type: 'Spellcaster'},
        {type: 'Fairy'},
        {type: 'Fiend'},
        {type: 'Zombie'},
        {type: 'Machine'},
        {type: 'Aqua'},
        {type: 'Pyro'},
        {type: 'Rock'},
        {type: 'Winged Beast'},
        {type: 'Plant'},
        {type: 'Insect'},
        {type: 'Thunder'},
        {type: 'Dragon'},
        {type: 'Beast'},
        {type: 'Beast-Warrior'},
        {type: 'Dinosaur'},
        {type: 'Fish'},
        {type: 'Sea Serpent'},
        {type: 'Reptile'},
        {type: 'Psychic'},
        {type: 'Divine-Beast'},
        {type: 'Creator God'},
        {type: 'Wyrm'},
        {type: 'Cyberse'},
    ];

    spellType = [
        {type: 'All'},
        {type: 'Normal'},
        {type: 'Quick-Play'},
        {type: 'Continuous'},
        {type: 'Ritual'},
        {type: 'Equip'},
        {type: 'Field'},
    ];

    trapType = [
        {type: 'All'},
        {type: 'Normal'},
        {type: 'Continuous'},
        {type: 'Counter'},
    ];


    cardCategory = [
        {category: 'All', query: 'All'},
        {category: 'Monster', query: 'Monster'},
        {category: 'Spell', query: 'Spell Card'},
        {category: 'Trap', query: 'Trap Card'}];


    listOfCards: any = [];

    selectedQuery;
    selectedCategory;

    selectedTrapType;
    selectedSpellType;

    selectedMonsterFrame;
    selectedMonsterType;
    selectedMonsterAtt;

    constructor(public http: HttpClient,
                public loadingCtrl: LoadingController,
                public cardsList: CardslistService) {
    }


    setCategory(ev: any) {
        console.log(ev.target.value);
        this.selectedCategory = ev.target.value;
    }

    setMonsterType(ev: any) {
        console.log(ev.target.value);
        this.selectedMonsterType = ev.target.value;
    }

    setMonsterAtt(ev: any) {
        this.selectedMonsterAtt = ev.target.value;
    }

    setMonsterFrame(ev: any) {
        console.log(ev.target.value);
        this.selectedMonsterFrame = ev.target.value;
    }

    setSpellType(ev: any) {
        this.selectedSpellType = ev.target.value;
    }

    setTrapType(ev: any) {
        this.selectedTrapType = ev.target.value;
    }

    setQuery(ev: any) {
        this.selectedQuery = ev.target.value.toLowerCase();
    }


    async searchByName(name: any) {
        let loading = await this.loadingCtrl.create({
            spinner: 'bubbles',
            message: 'Getting cards...'
        });
        await loading.present();

        let query = name.target.value.toLowerCase();
        if (query != this.previousQuery.toLowerCase() && query != '') {
            this.previousQuery = query;
            this.listOfCards = [];
            this.http.get(String.Format('https://db.ygoprodeck.com/api/v6/cardinfo.php?&fname={0}', query))
                .subscribe(response => {
                    for (let i = 0; i < 100; i++) {
                        this.listOfCards.push(response[i]);
                    }
                });
            await loading.dismiss();
        } else {
            await loading.dismiss();
            return;
        }
    }

    search() {
        let url = 'https://db.ygoprodeck.com/api/v6/cardinfo.php';
        let queries = '';

        if (this.selectedCategory != null
            || this.selectedTrapType != null
            || this.selectedQuery != null
            || this.selectedSpellType != null
            || this.selectedMonsterFrame != null
            || this.selectedMonsterAtt != null
            || this.selectedMonsterType != null) {

            if (this.selectedQuery != null) {
                queries = queries.concat(String.Format('&fname={0}', this.selectedQuery));
            }

            if (this.selectedCategory == 'Monster') {
                if (this.selectedMonsterFrame != null && this.selectedMonsterFrame != 'All') {
                    queries = queries.concat(String.Format('&type={0}', this.selectedMonsterFrame));
                }

                if (this.selectedMonsterAtt != null) {
                    queries = queries.concat(String.Format('&attribute={0}', this.selectedMonsterAtt));
                }

                if (this.selectedMonsterType != null) {
                    queries = queries.concat(String.Format('&race={0}', this.selectedMonsterType));
                }
            }

            if (this.selectedCategory == 'Spell Card') {
                queries = queries.concat(String.Format('&type={0}', this.selectedCategory));
                if (this.selectedSpellType != null) {
                    queries = queries.concat(String.Format('&race={0}', this.selectedSpellType));
                }
            }

            if (this.selectedCategory == 'Trap Card') {
                queries = queries.concat(String.Format('&type={0}', this.selectedCategory));
                if (this.selectedTrapType != null) {
                    queries = queries.concat(String.Format('&race={0}', this.selectedTrapType));
                }
            }


            url = url.concat(queries);
            url = url.replace(/&/i, '?');
            url = url.replace(/ /g, '%20');

        }
        console.log(url.toLowerCase());
    }


}
