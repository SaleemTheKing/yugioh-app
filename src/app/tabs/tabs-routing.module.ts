import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'duel-calculator',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../duel-calculator/duel-calculator.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'card-search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../card-search/card-search.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../settings/settings.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/duel-calculator',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/duel-calculator',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
