import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SharedMessageService } from '../services/shared-message.service';


@Component({
  selector: 'qot-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  public ingredientsForm: FormGroup;
  public items: Array<string>;


  constructor(private fb: FormBuilder,
    private router: Router,
    private messageService: SharedMessageService) {
    this.ingredientsForm = this.fb.group({
      ingredientsPicker: [undefined]
    });
  }

  ngOnInit() {

   }

  // public addIngredient(): void {
  //   const inputValue = this.ingredientsForm.getRawValue()['ingredient'].trim();
  //   if (inputValue === '' || inputValue === undefined) {
  //     return;
  //   }

  //   if (this.items.find(i => i === inputValue)) {
  //     return;
  //   }

  //   this.items.push(inputValue);
  //   this.ingredientsForm.setValue({
  //     ingredient: ''
  //   });
  // }

  // public removeIngredient(item: any): void {
  //   const filteredItems = this.items.filter(i => i !== item);
  //   this.items = filteredItems;
  // }

  public showResults() {
    const ingredientPickerValue = this.ingredientsForm.get('ingredientsPicker').value;
    this.items = ingredientPickerValue.ingredientsPickerItems.map(a => a.name);
    console.log(this.items);
    this.messageService.putMessage(this.items);
    this.router.navigateByUrl('/results');
  }
}
