import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToppingsModule } from './toppings/toppings.module';
import { PizzaModule } from './pizza/pizza.module';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ToppingsModule, PizzaModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
