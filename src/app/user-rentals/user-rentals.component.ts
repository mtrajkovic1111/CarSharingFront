import { RentalsService } from './../service/rentals.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-rentals',
  templateUrl: './user-rentals.component.html',
  styleUrls: ['./user-rentals.component.css']
})
export class UserRentalsComponent implements OnInit {
  userId;
  rentedCars = null;
  config: any;

  constructor(private userService: UserService,
              private rentalsService: RentalsService) { }

  ngOnInit() {
    this.userService.getUserByUsername()
        .subscribe((data) => {
          this.userId = data['id'];
          this.rentalsService.getRentalsByUserId(this.userId)
          .subscribe((data) => {
            this.rentedCars = data;
            console.log(this.rentedCars + 'llll');
            this.config = {
              itemsPerPage: 2,
              currentPage: 1,
              totalItems: this.rentedCars.length
            };
          });

        });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
