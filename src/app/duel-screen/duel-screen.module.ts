import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuelScreenPageRoutingModule } from './duel-screen-routing.module';

import { DuelScreenPage } from './duel-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DuelScreenPageRoutingModule
  ],
  declarations: [DuelScreenPage]
})
export class DuelScreenPageModule {}
