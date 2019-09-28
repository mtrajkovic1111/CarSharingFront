import { UserService } from 'src/app/service/user.service';
import { NgForm } from '@angular/forms';
import { CarService } from './../service/car.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTableResource } from 'angular7-data-table';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  cities;
  transmissions;
  variants;
  searchedCars;
  carDetails;
  vehicleId: any;
  vehicles: Array<any> = [];
  details = false;
  table = false;
  userId: number;
  carId: number;
  dateRange;
  tableResource: DataTableResource<any>;
  config: any;
  pipe = new DatePipe('en-US');
  rentedCarId;
  imageUrl ="/assets/img/nopic.png";

  @ViewChild('f') form: NgForm;

  constructor(private carService: CarService,
              private router: Router,
              private userService: UserService,
              private toastr: ToastrService) {

    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-red',
      showWeekNumbers: false,
      rangeInputFormat: 'DD/MM/YYYY'
    });

  }

  ngOnInit() {
    this.carService.getCities()
      .subscribe((data) => {
        this.cities = data;
      });

    this.carService.getTransmission()
        .subscribe((data) => {
          this.transmissions = data;
        });

    this.carService.getAllVariants()
        .subscribe((data) => {
          this.variants = data;
        });

    this.userService.getUserByUsername()
        .subscribe((data) => {
          this.userId = data['id'];
        });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  hideCard() {
    this.router.navigate(['/home']);
  }

  onDetails(index: number) {
    console.log(index);
    this.details = true;
    for (let i = 0; i < this.searchedCars.length; i++) {
      if (this.searchedCars[i]['id'] == index) {
        this.carDetails = this.searchedCars[i];
        this.carId = this.carDetails['id'];
        console.log('Car details ' + this.carDetails);
        console.log('Car details ' + this.carDetails.fuelTypes);
        console.log('Car Id ' + this.carId);
      }

  }
}
  onBack() {
    this.details = false;
  }

  onRent() {
    console.log('CarId : ' + this.carId);
    const body = {
      carId :  this.carId,
      userId : this.userId,
      fromDate : this.dateRange[0],
      tillDate : this.dateRange[1],
      totalPricePerDay: this.carDetails['pricePerDay']
    };
    this.carService.addToCarRental(body)
      .subscribe((data) => {
        this.rentedCarId = data['id'];
        this.toastr.success('You have successfully rented this vehicles!');
        this.router.navigate(['/search', this.rentedCarId]);
      });
  }

  onSearch() {
    this.vehicles = [];
    // this.searchedCars = [];
    const cityId = this.form.value.city;
    const brandId = null;
    const modelId = null;
    const variantId = this.form.value.variant;
    const transmissionId = this.form.value.trans;
    const fuelTypeId = this.form.value.ftype;
    this.dateRange = this.form.value.rentPeriod;
    // console.log(this.dateRange);
    //const now = Date.now();
   // const myFormattedDate = this.pipe.transform(now, 'short');
    const format = 'dd/MM/yyyy';
    // const myDate = '2019-06-29';
  const locale = 'en-US';
    // const formattedDate = formatDate(myDate, format, locale);

    const sDate = this.dateRange[0];
    const eDate = this. dateRange[1];
    //const startDate = this.pipe.transform(sDate, 'full');
    //const endDate = this.pipe.transform(eDate, 'full');
    const startDate = formatDate(sDate, format, locale);
    const endDate = formatDate(eDate, format, locale);

    console.log('start date ' + startDate);
    console.log('end date ' + endDate);


    this.carService.getSearchedCars(cityId, startDate, endDate, brandId, modelId, variantId, transmissionId, fuelTypeId)
      .subscribe((data) => {
        this.searchedCars = data;
        this.table = true;
        this.config = {
          itemsPerPage: 2,
          currentPage: 1,
          totalItems: this.searchedCars.length
        };
        console.log('Searched data' + this.searchedCars);

            //remek delo
        // this.searchedCars.forEach(element => {
        // console.log('Element ' + element);
        // this.vehicleId = element['vehicleId'];
        // console.log('VehicleId' + this.vehicleId);
        // this.carService.getVehicleModelVariant(this.vehicleId)
        // .subscribe((dataVeh) => {

        //  console.log('ModelVariat:' + dataVeh);
        //  this.vehicles.push({dataVeh});

        //  console.log('Vehicle:' + this.vehicles);
       //  });
        // });

      });

  }

}

