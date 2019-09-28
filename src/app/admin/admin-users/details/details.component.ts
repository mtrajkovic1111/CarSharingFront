import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
user: any;
fetchedId: number;
imageUrl = '/assets/img/avatar.jpg';
countCars;

  constructor(private carService: CarService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchedId = +this.route.snapshot.params.id;
    this.route.params
         .subscribe((params: Params) => {
          this.fetchedId = +params.id;
       });


    this.userService.getUserById(this.fetchedId)
       .subscribe((data) => {
         this.user = data;
       });

    this.carService.getNumberOfUsersCar(this.fetchedId)
        .subscribe((data) => {
          this.countCars = data;
        });
  }

}
