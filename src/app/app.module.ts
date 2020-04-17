import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {SettingsPage} from './settings/settings.page';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {NumpadComponent} from './components/numpad/numpad.component';
import {DuelScreenPage} from './duel-screen/duel-screen.page';
import {NumpadUpsidedownComponent} from './components/numpad-upsidedown/numpad-upsidedown.component';
import {CountdownComponent, CountdownGlobalConfig, CountdownModule} from 'ngx-countdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CardDetailsComponent} from './components/card-details/card-details.component';
import {CardslistService} from './services/cardslist/cardslist.service';
import {PlayerService} from './services/player/player.service';

@NgModule({
    declarations: [AppComponent, NumpadComponent, NumpadUpsidedownComponent, CardDetailsComponent],
    entryComponents: [NumpadComponent, NumpadUpsidedownComponent, CardDetailsComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        CountdownModule,
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        SettingsPage,
        CountdownComponent,
        DuelScreenPage,
        NumpadComponent,
        NumpadUpsidedownComponent,
        HttpClient,
        CountdownGlobalConfig,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
