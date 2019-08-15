import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPanelComponent } from './search-panel/search-panel.component';

const routes: Routes = [
  { path: 'search', component: SearchPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
