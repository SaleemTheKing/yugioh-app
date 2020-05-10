import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {String} from 'typescript-string-operations';
import {CardslistService} from '../services/cardslist/cardslist.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';

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
        {frame: 'Xyz', query: 'XYZ Monster'},
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
        {type: 'All'},
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

    level = [
        {level: 'All'},
        {level: '1'},
        {level: '2'},
        {level: '3'},
        {level: '4'},
        {level: '5'},
        {level: '6'},
        {level: '7'},
        {level: '8'},
        {level: '9'},
        {level: '10'},
        {level: '11'},
        {level: '12'},
    ];

    levelRange = [
        {range: 'All', query: ''},
        {range: 'Equals', query: 'eq'},
        {range: 'Greater Than', query: 'gte'},
        {range: 'Less Than', query: 'lte'},
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
        {category: 'Trap', query: 'Trap Card'}
    ];

    selectedQuery;
    selectedCategory;

    selectedTrapType;
    selectedSpellType;

    selectedMonsterFrame;
    selectedMonsterType;
    selectedMonsterAtt;
    selectedLevel;
    selectedLevelRange;

    constructor(public http: HttpClient,
                public cardsList: CardslistService,
                public router: Router,
                public alertCtrl: AlertController,
                public loadCtrl: LoadingController) {
    }


    setCategory(ev: any) {
        this.selectedCategory = ev.target.value;
    }

    setMonsterType(ev: any) {
        this.selectedMonsterType = ev.target.value;
    }

    setMonsterAtt(ev: any) {
        this.selectedMonsterAtt = ev.target.value;
    }

    setMonsterFrame(ev: any) {
        this.selectedMonsterFrame = ev.target.value;
    }

    setRank(ev: any) {
        this.selectedLevel = ev.target.value;
    }

    setRankRange(ev: any) {
        this.selectedLevelRange = ev.target.value;
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

    async load() {
        let loading = await this.loadCtrl.create({
            spinner: 'bubbles',
            message: 'Getting cards...',
            duration: 5000
        });
        await loading.present();
    }


    search() {
        this.load().then(() => {

            let url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
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

                    if (this.selectedMonsterAtt != null && this.selectedMonsterAtt != 'All') {
                        queries = queries.concat(String.Format('&attribute={0}', this.selectedMonsterAtt));
                    }

                    if (this.selectedMonsterType != null && this.selectedMonsterType != 'All') {
                        queries = queries.concat(String.Format('&race={0}', this.selectedMonsterType));
                    }

                    if (this.selectedLevel != null && this.selectedLevel != 'All') {
                        if (this.selectedLevelRange != '' || this.selectedLevelRange != null) {
                            queries = queries.concat(String.Format('&level={0}{1}', this.selectedLevelRange, this.selectedLevel));
                        } else {
                            queries = queries.concat(String.Format('&level={0}', this.selectedLevel));
                        }
                    }
                } else if (this.selectedCategory == 'Spell Card') {
                    queries = queries.concat(String.Format('&type={0}', this.selectedCategory));
                    if (this.selectedSpellType != null) {
                        queries = queries.concat(String.Format('&race={0}', this.selectedSpellType));
                    }
                } else if (this.selectedCategory == 'Trap Card') {
                    queries = queries.concat(String.Format('&type={0}', this.selectedCategory));
                    if (this.selectedTrapType != null) {
                        queries = queries.concat(String.Format('&race={0}', this.selectedTrapType));
                    }
                }
                url = url.concat(queries).replace(/&/i, '?').replace(/ /g, '%20').toLowerCase();
            }

            this.http.get(url).subscribe(data => {
                    this.cardsList.cardsList = data;
                    this.loadCtrl.dismiss();
                    this.router.navigate(['/search-results']);
                },
                async error => {
                    let alert = await this.alertCtrl.create({
                        message: 'No cards found',
                        buttons: ['Ok']
                    });

                    await alert.present();
                }
            );
        });
    }
}
