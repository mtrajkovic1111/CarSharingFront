import { CarService } from 'src/app/service/car.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { RentalsService } from '../service/rentals.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rented-car',
  templateUrl: './rented-car.component.html',
  styleUrls: ['./rented-car.component.css']
})
export class RentedCarComponent implements OnInit {
  fetchedId;
  rentedCar = null;
  carId;
  car;
  extraPrice = true;
  hasNav = false;
  hasEns = false;
  ensPrice;
  navPrice;
  navOption;
  ensOption;
  @ViewChild('f') form: NgForm;
  nav = false;
  ens = false;
  total = 0;

  constructor(private route: ActivatedRoute,
              private rentalsService: RentalsService,
              private router: Router,
              private carService: CarService) { }

  ngOnInit() {
    this.fetchedId = +this.route.snapshot.params['id'];
    this.route.params
      .subscribe((params: Params) => {
        this.fetchedId = +params['id'];
        this.rentalsService.getRentalsById(this.fetchedId)
            .subscribe((data) => {
             // console.log('jeee' + data[0]['fromDate']);
              this.rentedCar = data;
              this.carService.getById(this.rentedCar['car']['id'])
                  .subscribe((res) => {
                    this.car = res;
                    if (this.car['navigationPrice'] == 0 && this.car['ensurancePrice'] == 0) {
                      this.extraPrice = false;
                    }
                    if (this.car['navigationPrice'] != 0) {
                        this.hasNav = true;
                        this.navPrice = this.car['navigationPrice'];
                    }
                    if (this.car['ensurancePrice'] != 0) {
                      this.hasEns = true;
                      this.ensPrice = this.car['ensurancePrice'];
                  }
                  });

            });
      });
  }


  displayExtraNav() {
    this.navOption = this.form.controls.navigation.value;
    console.log(this.navOption);

    if (this.navOption == "true") {
      this.nav = true;
    }
    if (this.navOption == "false") {
      this.nav = false;
      this.navPrice = 0;
      this.countPrice();
    }
  }

  countPrice() {
    let price = this.car['pricePerDay'];
    this.total = price;

    if (this.navOption == "true") {
     this.navPrice = this.car['navigationPrice'];
     this.total = price + this.navPrice;
   } else {
     this.navPrice = 0;
   }

    if (this.ensOption == "true") {
     this.ensPrice = this.car['ensurancePrice'];
     this.total = price + this.navPrice + this.ensPrice;
   } else {
     this.ensPrice = 0;
   }

    return this.total;

 }

  displayExtraEns() {
    this.ensOption = this.form.controls.ensurance.value;

    if (this.ensOption == "true") {
      this.ens = true;
    }
    if (this.ensOption == "false") {
      this.ens = false;
      this.ensPrice = 0;
      this.countPrice();
    }
  }

  onSubmit() {
    const body = {
      totalPricePerDay: this.total,
      rentedWithNavigation: this.navOption,
      rentedWithEnsurance: this.ensOption
    };

    this.rentalsService.updateRentalsWithTotalPrice(this.fetchedId, body)
        .subscribe((data) => {
          console.log(data);
          this.extraPrice = false;
        });

  }

  onOk() {
    this.router.navigate(['/user/rentals']);
  }

}
