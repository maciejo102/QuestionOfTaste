import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'qot-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  public ingredientsForm: FormGroup;
  public items: Array<string>;


  constructor(private fb: FormBuilder,
    private router: Router)
    {
    this.ingredientsForm = this.fb.group({
      ingredientsPicker: [undefined]
    });
  }

  ngOnInit() {

   }

  public showResults() {
    const ingredientPickerValue = this.ingredientsForm.get('ingredientsPicker').value;
    this.items = ingredientPickerValue.ingredientsPickerItems.map(a => a.name);
    this.router.navigate(['/dishes', this.items.join(',')]);
  }
}
