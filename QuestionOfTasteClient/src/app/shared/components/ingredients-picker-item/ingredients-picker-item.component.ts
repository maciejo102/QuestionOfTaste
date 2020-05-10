import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredient.model';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'qot-ingredients-picker-item',
  templateUrl: './ingredients-picker-item.component.html',
  styleUrls: ['./ingredients-picker-item.component.scss']
})
export class IngredientsPickerItemComponent {

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'ingredient',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/images/diet.svg')
    );
   }

  @Input()
  public searchPattern: string;

  @Input()
  public ingredient: IIngredient;
}
