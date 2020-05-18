import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToppingsModule } from './toppings/toppings.module';
import { PizzaModule } from './pizza/pizza.module';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
  { path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ToppingsModule, PizzaModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
