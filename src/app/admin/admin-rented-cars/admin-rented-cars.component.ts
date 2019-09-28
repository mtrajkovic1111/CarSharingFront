import { Rental } from './../../shared/rentals.models';
import { UserService } from './../../service/user.service';
import { RentalsService } from './../../service/rentals.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-rented-cars',
  templateUrl: './admin-rented-cars.component.html',
  styleUrls: ['./admin-rented-cars.component.css']
})
export class AdminRentedCarsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public displayedColumns = ['fromDate', 'tillDate', 'car', 'user', 'pricePerDay'];
  public dataSource = new MatTableDataSource<Rental>();

  constructor(private rentalsService: RentalsService,
              private userService: UserService) { }

  ngOnInit() {
    this.rentalsService.getAllRentedCars()
        .subscribe((data) => {
         // console.log('fffff' + data);
          this.dataSource.data = data as Rental[];
        });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
