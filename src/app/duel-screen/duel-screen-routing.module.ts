import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuelScreenPage } from './duel-screen.page';

const routes: Routes = [
  {
    path: '',
    component: DuelScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuelScreenPageRoutingModule {}
