import { Observable, Subscription } from 'rxjs';
import { IDishes } from './../models/dish.model';
import { DishService } from './../services/dish.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedMessageService } from '../services/shared-message.service';

@Component({
  selector: 'qot-dish-result',
  templateUrl: './dish-result.component.html',
  styleUrls: ['./dish-result.component.css']
})
export class DishResultComponent implements OnInit, OnDestroy {

  public dishes$: Observable<IDishes>;
  public panelOpenState = false;

  private selectedIngredientsSubscription: Subscription;
  private selectedtIngredients: Array<string>;

  constructor(private dishService: DishService,
    private messageService: SharedMessageService) { }

  ngOnInit(): void {
    this.selectedIngredientsSubscription = this.messageService.currentIngredientsMessage
      .subscribe(ingredientsArray => {
        this.selectedtIngredients = ingredientsArray;
      });
    this.dishes$ = this.dishService.getDishesForGivenIngredients(this.selectedtIngredients.join(','));
    this.dishes$.subscribe(res => console.log(res));
  }

  ngOnDestroy(): void {
    if (this.selectedIngredientsSubscription) {
      this.selectedIngredientsSubscription.unsubscribe();
    }1
  }

}
