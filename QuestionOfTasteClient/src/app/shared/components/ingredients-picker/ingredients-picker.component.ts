import { IIngredientsPickerItems, IIngredient } from './../../../models/ingredient.model';
import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';
import { map } from 'rxjs/operators';

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

  constructor(private ingredientsService: IngredientService) { }

  public emptyListLabelText = 'pusto';
  public inputPlaceholderText = 'dawaj!!';

  public boundIngredientsSource: Function;
  public selectedIngredients: Array<IIngredient> = [];
  public disabled = false;

  ngOnInit() {
    this.boundIngredientsSource = this.ingredientsSource.bind(this);
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
