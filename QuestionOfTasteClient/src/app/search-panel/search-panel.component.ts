import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'qot-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  public ingredientsForm: FormGroup;
  public items: Array<string> = [];


  constructor(private fb: FormBuilder) {
    this.ingredientsForm = this.fb.group({
      ingredientsPicker: [undefined]
    });
  }

  ngOnInit() {

   }

  public addIngredient(): void {
    const inputValue = this.ingredientsForm.getRawValue()['ingredient'].trim();
    if (inputValue === '' || inputValue === undefined) {
      return;
    }

    if (this.items.find(i => i === inputValue)) {
      return;
    }

    this.items.push(inputValue);
    this.ingredientsForm.setValue({
      ingredient: ''
    });
  }

  public removeIngredient(item: any): void {
    const filteredItems = this.items.filter(i => i !== item);
    this.items = filteredItems;
  }
}
