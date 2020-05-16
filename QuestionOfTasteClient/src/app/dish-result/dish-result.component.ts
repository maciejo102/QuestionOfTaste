import { Observable, Subscription } from 'rxjs';
import { IDishes } from './../models/dish.model';
import { DishService } from './../services/dish.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'qot-dish-result',
  templateUrl: './dish-result.component.html',
  styleUrls: ['./dish-result.component.scss']
})
export class DishResultComponent implements OnInit, OnDestroy {

  public dishes$: Observable<IDishes>;
  public panelOpenState = false;

  private selectedIngredientsSubscription: Subscription;
  private selectedIngridientsFromUrl: string;

  constructor(private dishService: DishService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.selectedIngridientsFromUrl = this.route.snapshot.paramMap.get('ingredients');
  this.dishes$ = this.dishService.getDishesForGivenIngredients(this.selectedIngridientsFromUrl);
  }

  ngOnDestroy(): void {
    if (this.selectedIngredientsSubscription) {
      this.selectedIngredientsSubscription.unsubscribe();
    }
  }
}
