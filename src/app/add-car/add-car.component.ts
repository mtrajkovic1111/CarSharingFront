import { UserService } from './../service/user.service';
import { NgForm } from '@angular/forms';
import { CarService } from './../service/car.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})


export class AddCarComponent implements OnInit {
@ViewChild('f') form: NgForm;
brands: any;
models: any;
variants: any;
transmission: any;
fuelType: any;
hasAirCondition = true; // ?
cities: any;
addressId: number;
userId: number;
vehId: number;
addedCarId: number;



  constructor(private carService: CarService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.carService.getBrands()
      .subscribe((data: any) => {
            this.brands = data;
        });

    this.carService.getTransmission()
        .subscribe((data: any) => {
          this.transmission = data;
        });

    this.carService.getFuelType()
        .subscribe((data: any) => {
          this.fuelType = data;
        });

    this.carService.getCities()
        .subscribe((data: any) => {
        this.cities = data;
        });

    this.userService.getUserByUsername()
        .subscribe((data) => {
          console.log(data);
          this.userId = data['id'];
          console.log(this.userId);
        });

  }


  getModels(brandId: number) {
    this.carService.getModelsByBrand(brandId)
      .subscribe((data: any) => {
        this.models = data;
      });
  }

  getVariants(modelId: number) {
    this.carService.getVariantByModel(modelId)
      .subscribe((data: any) => {
        this.variants = data;
      });
  }

getVehicleID() {
  const modelId = this.form.controls.model.value;
  const variantId = this.form.controls.variant.value;
  this.carService.getVehicleId(modelId, variantId)
  .subscribe((data) => {
    this.vehId = data[0].id;
    console.log(this.vehId);
  });

}




  onCancel() {
    this.router.navigate(['/home']);
  }


  onNext() {

    const address = {
      street: this.form.controls.street.value,
      number: this.form.controls.num.value,
      cityId: this.form.controls.city.value
    };

    const ftype = [
      {
        Id: this.form.controls.ftype.value
      }
    ];

    const body = {
      licencePlate: this.form.controls.licencePlate.value,
      engineSize: this.form.controls.engineSize.value,
      doors: this.form.controls.doors.value,
      year: this.form.controls.year.value,
      transmissionId: this.form.controls.trans.value,
      userId: this.userId,
      vehicleId: this.vehId,
      addressDTO: address,
      fuelTypesDTO: ftype
    };

    console.log(body);

    this.carService.addCar(body)
        .subscribe((data) => {
          console.log(data);
          this.addedCarId = data['id'];
          console.log(this.addedCarId);
          this.router.navigate(['/add-car', this.addedCarId]);
        });


  }

}
