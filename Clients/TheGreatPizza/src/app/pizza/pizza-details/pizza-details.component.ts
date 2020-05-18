import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PizzaService } from '../pizza.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pizza } from '../pizza';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.scss']
})
export class PizzaDetailsComponent implements OnInit {

  public pizzaForm: FormGroup;
  public pizza: Pizza;
  constructor(
    private pizzaService: PizzaService,
    public dialogRef: MatDialogRef<PizzaDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    this.getPizza(this.data);
    this.pizzaForm = new FormGroup({
      description: new FormControl({value:'', disabled: true})
    });
  }

  getPizza(id: number) {
    this.pizzaService.getPizza(id).subscribe(pizza => {
      this.pizza = pizza;
      if (this.pizza.description) {
        this.pizzaForm.patchValue({
          description: this.pizza.description
        });
      }
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    // TODO add skills;
  }
}
