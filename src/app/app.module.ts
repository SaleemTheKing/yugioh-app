import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {SettingsPage} from './settings/settings.page';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {NumpadComponent} from './numpad/numpad.component';
import {DuelScreenPage} from './duel-screen/duel-screen.page';
import {NumpadUpsidedownComponent} from './numpad-upsidedown/numpad-upsidedown.component';

@NgModule({
    declarations: [AppComponent, NumpadComponent, NumpadUpsidedownComponent],
    entryComponents: [NumpadComponent, NumpadUpsidedownComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        SettingsPage,
        DuelScreenPage,
        NumpadComponent,
        NumpadUpsidedownComponent,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
