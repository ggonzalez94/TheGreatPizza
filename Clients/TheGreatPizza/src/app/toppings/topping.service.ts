import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topping } from './topping';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {

  private baseUrl = 'https://localhost:5001/api/Topping/';

  constructor(private http: HttpClient) { }

  getToppings(): Observable<GetAllToppings> {
    return this.http.get<GetAllToppings>(this.baseUrl + 'GetAll');
  }

  deleteTopping(id: number): Observable<{}> {
    const url = `${this.baseUrl}Delete/${id}`;
    return this.http.delete(url);
  }

  createTopping(topping: CreateTopping): Observable<{}> {
    const url = `${this.baseUrl}Create`;
    return this.http.post(url, topping);
  }

}

export interface GetAllToppings {
  toppings: Topping[];
}

export interface CreateTopping {
  name: string;
}
