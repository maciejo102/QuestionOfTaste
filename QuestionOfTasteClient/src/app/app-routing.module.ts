import { DishResultComponent } from './dish-result/dish-result.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPanelComponent } from './search-panel/search-panel.component';

const routes: Routes = [
  { path: '', component: SearchPanelComponent },
  { path: 'dishes/:ingredients', component: DishResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
