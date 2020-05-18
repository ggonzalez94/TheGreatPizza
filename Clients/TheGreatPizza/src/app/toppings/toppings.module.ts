import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ToppingListComponent } from './topping-list/topping-list.component';
import { RouterModule } from '@angular/router';
import { CreateToppingComponent } from './create-topping/create-topping.component';



@NgModule({
  declarations: [ToppingListComponent, CreateToppingComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'toppings',
        children: [
          { path: '', component: ToppingListComponent }
        ]
      }
    ])
  ],
  entryComponents: [CreateToppingComponent]
})
export class ToppingsModule { }
