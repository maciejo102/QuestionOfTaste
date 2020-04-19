import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HighlightPipe } from './shared/pipes/highlight.pipe';
import { MaterialLoaderModule } from './mat-loader/material-loader.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientService } from './services/ingredient.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MultiPickerComponent } from './shared/components/multi-picker/multi-picker.component';
import { IngredientsPickerComponent } from './shared/components/ingredients-picker/ingredients-picker.component';
import { IngredientsPickerItemComponent } from './shared/components/ingredients-picker-item/ingredients-picker-item.component';
import localeUs from '@angular/common/locales/en-US-POSIX';
import localePL from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { MAT_DATE_LOCALE } from '@angular/material';

registerLocaleData(localeUs);
registerLocaleData(localePL);

export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


export class ServiceLocator {
  public static injector: Injector;
}

@NgModule({
  declarations: [
    AppComponent,
    SearchPanelComponent,
    HighlightPipe,
    MultiPickerComponent,
    IngredientsPickerComponent,
    IngredientsPickerItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialLoaderModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    IngredientService,
    {
      provide: MAT_DATE_LOCALE, deps: [TranslateService],
      useFactory: (translateService: TranslateService) => {
        return translateService.getBrowserLang();
      },
    },
    {
      provide: LOCALE_ID, deps: [TranslateService],
      useFactory: (translateService: TranslateService) => translateService.getBrowserLang(),
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    ServiceLocator.injector = injector;
  }
 }
