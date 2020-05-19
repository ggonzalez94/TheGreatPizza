import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pizza } from './pizza';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private baseUrl = 'http://localhost:5000/api/Pizza/';

  constructor(private http: HttpClient) { }

  getPizzas(): Observable<GetAllPizzas> {
    return this.http.get<GetAllPizzas>(this.baseUrl + 'GetAll');
  }

  createPizza(pizza: CreatePizza): Observable<{}> {
    return this.http.post(this.baseUrl + 'Create', pizza);
  }

  deletePizza(id: number): Observable<{}> {
    const url = `${this.baseUrl}Delete/${id}`;
    return this.http.delete(url);
  }

  getPizza(id: number): Observable<Pizza> {
    const url = `${this.baseUrl}Get/${id}`;
    return this.http.get<Pizza>(url);
  }

  addTopping(pizzaId: number, toppingId: number): Observable<{}> {
    const url = `${this.baseUrl}AddTopping/${pizzaId}`;
    return this.http.post(url, {toppingId} as AddTopping);
  }

  removeTopping(pizzaId: number, toppingId: number): Observable<{}> {
    const url = `${this.baseUrl}RemoveTopping/${pizzaId}`;
    return this.http.post(url, {toppingId} as RemoveTopping);
  }

}

export interface GetAllPizzas {
  pizzas: Pizza[];
}

export interface CreatePizza {
  name: string;
  description?: string;
}

export interface AddTopping {
  toppingId: number;
}

export interface RemoveTopping {
  toppingId: number;
}
