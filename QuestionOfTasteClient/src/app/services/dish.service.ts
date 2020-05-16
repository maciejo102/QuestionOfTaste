import { Observable } from 'rxjs';
import { IDishes, IDish } from './../models/dish.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const baseUrl = '/api/qot/dishes-service/';

@Injectable()
export class DishService {

  constructor(private http: HttpClient) { }

  public getDishesForGivenIngredients(ingredients: string): Observable<IDishes> {
    const url = baseUrl + '/v1/dishes';
    const options = ingredients
    ? { params: new HttpParams().set('ingredients', ingredients) }
    : {};

    return this.http.get<IDishes>(url, options );
  }
}
