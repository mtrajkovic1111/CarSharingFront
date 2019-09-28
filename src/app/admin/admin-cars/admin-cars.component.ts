import { CarService } from './../../service/car.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Car } from 'src/app/shared/cars.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  countCars;



  public displayedColumns = ['vehicle', 'year', 'address', 'transmission', 'fuelTypes', 'engineSize', 'pricePerDay'];
  public dataSource = new MatTableDataSource<Car>();

  constructor(private carService: CarService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.carService.getAllCars()
        .subscribe((data) => {
          this.dataSource.data = data as Car[];
        });

    this.carService.getTotalNumberOfCars()
        .subscribe((data) => {
          this.countCars = data;
        });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  redirectToDetails(id: number) {
  //  this.router.navigate(['admin-users', id], {relativeTo: this.route});
  }

}
