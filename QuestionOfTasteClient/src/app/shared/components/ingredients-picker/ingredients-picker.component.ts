import { IIngredientsPickerItems, IIngredient } from './../../../models/ingredient.model';
import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'qot-ingredients-picker',
  templateUrl: './ingredients-picker.component.html',
  styleUrls: ['./ingredients-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IngredientsPickerComponent),
      multi: true,
    },
  ],
})
export class IngredientsPickerComponent implements OnInit, ControlValueAccessor {

  constructor(private ingredientsService: IngredientService,
    private translateService: TranslateService) { }

  public emptyListLabelText = 'pusto';
  public inputPlaceholderText: string;

  public boundIngredientsSource: Function;
  public selectedIngredients: Array<IIngredient> = [];
  public disabled = false;

  ngOnInit() {
    this.boundIngredientsSource = this.ingredientsSource.bind(this);

    this.translateService.use('pl-PL');

    // this.translateService.get(`INGREDIENTS.SEARCH`)
    // .subscribe((res: string) => (this.inputPlaceholderText = res));
  }

  writeValue(ingredients: IIngredientsPickerItems): void {
    if (!ingredients){
      this.selectedIngredients = [];
    } else {
      this.selectedIngredients = [...ingredients.ingredientsPickerItems];
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  propagateChange = (_: any) => {};

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ingredientsSource(pattern: string) {
    return this.ingredientsService.getIngredientsByPatern(pattern).pipe(
      map(response => {
        return [...response.ingredientsPickerItems];
      })
    );
  }


  removeItem(item) {
    this.selectedIngredients = this.selectedIngredients.filter(d => d.name !== item.name);
    this.onValueChanged();
  }

  selectItem(item) {
    this.selectItems([item]);
  }

  removeAllItems() {
    this.selectedIngredients = [];
    this.onValueChanged();
  }

  private onValueChanged() {
    this.propagateChange(<IIngredientsPickerItems>{
      ingredientsPickerItems: this.selectedIngredients,
    });
  }

  private selectItems(items: Array<IIngredient>) {
    const filteredItems = items.filter(
      i => !this.selectedIngredients.find(d => i.name === d.name),
    );

    if (filteredItems.length === 0) {
      return;
    }

    this.selectedIngredients = [...this.selectedIngredients, ...filteredItems];
    this.onValueChanged();
  }
}
