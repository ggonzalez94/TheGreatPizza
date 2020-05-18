import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { PizzaService, CreatePizza } from '../pizza.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-pizza',
  templateUrl: './create-pizza.component.html',
  styleUrls: ['./create-pizza.component.scss']
})
export class CreatePizzaComponent implements OnInit {

  public pizzaForm: FormGroup;
  constructor(
    private location: Location,
    private pizzaService: PizzaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pizzaForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl(''),
    });
  }

  onCreate() {
    const request: CreatePizza = {
      name: this.pizzaForm.value.name,
      description: this.pizzaForm.value.description
    };
    this.pizzaService.createPizza(request)
      .subscribe(() => this.router.navigate(['../'], {relativeTo: this.route}));
  }

  onCancel() {
    this.location.back();
  }

}
