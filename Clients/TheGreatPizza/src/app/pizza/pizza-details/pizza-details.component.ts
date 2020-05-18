import { Component, OnInit, Inject } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pizza } from '../pizza';
import { Topping } from 'src/app/toppings/topping';
import { ToppingService } from 'src/app/toppings/topping.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.scss']
})
export class PizzaDetailsComponent implements OnInit {

  public pizza: Pizza;
  private toppings: Topping[] = [];
  public selectedToppings: Topping[] = [];

  constructor(
    private pizzaService: PizzaService,
    private toppingService: ToppingService,
    public dialogRef: MatDialogRef<PizzaDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    this.getPizza(this.data);
    this.getAvailableToppings();
  }

  getPizza(id: number) {
    this.pizzaService.getPizza(id).subscribe(pizza => {
      this.pizza = pizza;
    });
  }

  getAvailableToppings() {
    this.toppingService.getToppings()
      .subscribe(result => {
        this.toppings = result.toppings;
        this.selectedToppings = this.toppings;
      });
  }

  onToppingSelected(selection: MatSelectChange) {
    this.pizzaService.addTopping(this.pizza.id, selection.value.id)
      .subscribe(() => this.getPizza(this.pizza.id));
  }

  onClose() {
    this.dialogRef.close();
  }

  onDelete(topping: Topping) {
    this.pizzaService.removeTopping(this.pizza.id, topping.id)
      .subscribe(() => this.getPizza(this.pizza.id));
  }

  onKey(value) {
    this.selectedToppings = this.search(value);
  }

  search(value: string) {
    const filter = value.toLowerCase();
    return this.toppings.filter(option => option.name.toLowerCase().startsWith(filter));
  }

  optionDisabled(topping: Topping): boolean {
    return this.pizza.toppings.some(t => t.id === topping.id);
  }
}
