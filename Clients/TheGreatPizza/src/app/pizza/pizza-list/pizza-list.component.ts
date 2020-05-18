import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Pizza } from '../pizza';
import { PizzaService } from '../pizza.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { PizzaDetailsComponent } from '../pizza-details/pizza-details.component';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {

  dataSource: MatTableDataSource<Pizza> = new MatTableDataSource();
  columnsToDisplay = ['name', 'description', 'details', 'delete'];
  searchKey: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private pizzaService: PizzaService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPizzas();
  }

  getAllPizzas() {
    this.pizzaService.getPizzas().subscribe(result => {
      this.dataSource.data = result.pizzas;
      this.dataSource.paginator = this.paginator;
    });
  }

  onCreate() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onDelete(pizza: Pizza) {
    const dialogConfig = {
      backdropClass: 'modalOverlay',
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      width: '40%',
    } as MatDialogConfig;
    dialogConfig.data = { title: `Are you sure you want to remove ${pizza.name} from the available list of pizzas?`};

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.pizzaService.deletePizza(pizza.id).subscribe(() => this.getAllPizzas());
        }
      }
    );

  }

  onDetails(pizza: Pizza) {
    const dialogConfig = {
      backdropClass: 'modalOverlay',
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      width: '40%',
    } as MatDialogConfig;

    dialogConfig.data = pizza.id;

    const dialogRef = this.dialog.open(PizzaDetailsComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
