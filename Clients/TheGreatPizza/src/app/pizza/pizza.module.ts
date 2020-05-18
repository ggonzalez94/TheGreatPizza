import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { Router, RouterModule } from '@angular/router';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { PizzaDetailsComponent } from './pizza-details/pizza-details.component';



@NgModule({
  declarations: [PizzaListComponent, CreatePizzaComponent, PizzaDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'pizzas',
        children: [
          { path: '', component: PizzaListComponent },
          { path: 'create', component: CreatePizzaComponent }
        ]
      }
    ])
  ],
  entryComponents: [PizzaDetailsComponent]
})
export class PizzaModule { }
