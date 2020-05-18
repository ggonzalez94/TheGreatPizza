import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-topping',
  templateUrl: './create-topping.component.html',
  styleUrls: ['./create-topping.component.scss']
})
export class CreateToppingComponent implements OnInit {

  public toppingForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateToppingComponent>) { }

  ngOnInit(): void {
    this.toppingForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.dialogRef.close(this.toppingForm.value);
  }

}
