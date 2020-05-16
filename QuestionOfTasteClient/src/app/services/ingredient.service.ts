import { Observable } from 'rxjs';
import { IIngredient, IGetIngredientsPickerResponse } from './../models/ingredient.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = '/api/qot/ingredients-service/';

@Injectable()
export class IngredientService {

  constructor(private http: HttpClient) {
  }

  public getIngredientsByPatern(pattern: string): Observable<IGetIngredientsPickerResponse> {
    const url = baseUrl + 'v1/ingredients';
    const options = pattern
    ? { params: new HttpParams().set('pattern', pattern) }
    : {};

    return this.http.get<IGetIngredientsPickerResponse>(url, options );
  }
}
