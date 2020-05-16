import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedMessageService {

  private ingredientsMessageSource = new BehaviorSubject([]);

  public currentIngredientsMessage = this.ingredientsMessageSource.asObservable();

  constructor() { }

  public putMessage(message: Array<string>) {
    this.ingredientsMessageSource.next(message);
  }
}
