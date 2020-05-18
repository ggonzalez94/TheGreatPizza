import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pizza } from './pizza';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private baseUrl = 'https://localhost:5001/api/Pizza/';

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

}

export interface GetAllPizzas {
  pizzas: Pizza[];
}

export interface CreatePizza {
  name: string;
  description?: string;
}
