import { Component, OnInit, ViewChild } from '@angular/core';
import { Topping } from '../topping';
import { MatTableDataSource } from '@angular/material/table';
import { ToppingService, CreateTopping } from '../topping.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { CreateToppingComponent } from '../create-topping/create-topping.component';

@Component({
  selector: 'app-topping-list',
  templateUrl: './topping-list.component.html',
  styleUrls: ['./topping-list.component.scss']
})
export class ToppingListComponent implements OnInit {

  dataSource: MatTableDataSource<Topping> = new MatTableDataSource();
  columnsToDisplay = ['name', 'delete'];
  searchKey: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private toppingService: ToppingService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllToppings();
  }

  getAllToppings() {
    this.toppingService.getToppings().subscribe(result => {
      this.dataSource.data = result.toppings;
      this.dataSource.paginator = this.paginator;
    });
  }

  onDelete(topping: Topping) {
    const dialogConfig = {
      backdropClass: 'modalOverlay',
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      width: '40%',
    } as MatDialogConfig;
    dialogConfig.data = { title: `Are you sure you want to remove ${topping.name} from the available list of toppings?`};

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.toppingService.deleteTopping(topping.id).subscribe(() => this.getAllToppings());
        }
      }
    );
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    const dialogConfig = {
      backdropClass: 'modalOverlay',
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      width: '60%',
    } as MatDialogConfig;

    const dialogRef = this.dialog.open(CreateToppingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.toppingService.createTopping({name: data.name} as CreateTopping)
            .subscribe(() => this.getAllToppings());
        }
      }
    );
  }

}
