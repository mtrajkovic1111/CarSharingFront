import { CarService } from './../service/car.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-additionals',
  templateUrl: './additionals.component.html',
  styleUrls: ['./additionals.component.css']
})
export class AdditionalsComponent implements OnInit {
@ViewChild('f') form: NgForm;
nav = false;
ens = false;
total = 0;
navPrice;
ensPrice;
fetchedId: number;
navOption;
ensOption;

constructor(private route: ActivatedRoute,
            private carService: CarService,
            private toastr: ToastrService,
            private router: Router) {}

ngOnInit() {
  this.fetchedId = +this.route.snapshot.params['id'];
  this.route.params
    .subscribe((params: Params) => {
      this.fetchedId = +params['id'];
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

countPrice() {
   let price = this.form.controls.price.value;
   this.total = price;

   if (this.navOption == "true") {
    this.navPrice = this.form.controls.addNavPrice.value;
    this.total = price + this.navPrice;
  } else {
    this.navPrice = 0;
  }

   if (this.ensOption == "true") {
    this.ensPrice = this.form.controls.addEnsPrice.value;
    this.total = price + this.navPrice + this.ensPrice;
  } else {
    this.ensPrice = 0;
  }

   return this.total;

}

onUpdate() {
const body = {
  pricePerDay: this.form.controls.price.value,
  hasAirCondition: this.form.controls.airCondition.value,
  hasNavigation: this.form.controls.navigation.value,
  navigationPrice: this.navPrice,
  hasEnsurance: this.form.controls.ensurance.value,
  ensurancePrice: this.ensPrice,
};
// console.log('novi bodiprice' + body.ensurancePrice);
// console.log('novi bodiens' + body.ensurancePrice);
// console.log('novi bodinav' + body.navigationPrice);
this.carService.updateAddedCar(this.fetchedId, body)
  .subscribe((data) => {
    console.log(data);
    this.toastr.success('Car successfully added for  renting!');
  });
this.router.navigate(['/add-carpicture', this.fetchedId]);
}




}


