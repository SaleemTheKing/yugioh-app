import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuelScreenPageRoutingModule } from './duel-screen-routing.module';

import { DuelScreenPage } from './duel-screen.page';
import {CountdownModule} from 'ngx-countdown';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DuelScreenPageRoutingModule,
        CountdownModule
    ],
  declarations: [DuelScreenPage]
})
export class DuelScreenPageModule {}
