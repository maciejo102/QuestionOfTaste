import { HighlightPipe } from './shared/pipes/highlight.pipe';
import { MaterialLoaderModule } from './mat-loader/material-loader.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientService } from './services/ingredient.service';
import { HttpClientModule } from '@angular/common/http';
import { MultiPickerComponent } from './shared/components/multi-picker/multi-picker.component';
import { IngredientsPickerComponent } from './shared/components/ingredients-picker/ingredients-picker.component';
import { IngredientsPickerItemComponent } from './shared/components/ingredients-picker-item/ingredients-picker-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPanelComponent,
    HighlightPipe,
    MultiPickerComponent,
    IngredientsPickerComponent,
    IngredientsPickerItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialLoaderModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    IngredientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
