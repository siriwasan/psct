import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'events',
        children: [
          {
            path: '',
            loadChildren: () => import('../event-list/event-list.module').then(m => m.EventListPageModule)
          }
        ]
      },
      {
        path: 'registered',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../registered-list/registered-list.module').then(m => m.RegisteredListPageModule)
          }
        ]
      },
      {
        path: 'scores',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../score-list/score-list.module').then(m => m.ScoreListPageModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../about/about.module').then(m => m.AboutPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/events',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/events',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
