import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { RentalsService } from './../service/rentals.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../service/user.service';
import { CarService } from '../service/car.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-user-rentals-details',
  templateUrl: './user-rentals-details.component.html',
  styleUrls: ['./user-rentals-details.component.css'],
  providers: [DatePipe]
})
export class UserRentalsDetailsComponent implements OnInit {
  fetchedId;
  rentedCar = null;
  car;
  modalRef: BsModalRef;
  imageUrl = "/assets/img/nopic.png";

  constructor(private carService: CarService,
              private rentalsService: RentalsService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.fetchedId = +this.route.snapshot.params.id;
    this.route.params
         .subscribe((params: Params) => {
          this.fetchedId = +params.id;
       });
    this.rentalsService.getRentalsById(this.fetchedId)
                .subscribe((data) => {
                this.rentedCar = data;

                this.carService.getAllRelatedById(this.rentedCar['carId'])
                  .subscribe((res) => {
                    this.car = res;
                   // console.log(this.car + 'gggg');
                  });


                });


  }

onBack() {
  this.router.navigate(['/user/rentals']);
}

onCancelReservation(template: TemplateRef<any>, templateForbidden: TemplateRef<any>) {

  let CurrentDate = new Date();
  let FromDate = this.rentedCar['fromDate'];
  FromDate = new Date(FromDate);

  console.log(CurrentDate);

  console.log(FromDate);

  if (FromDate >= CurrentDate) {
   // var time = formatDate(Date.now(), 'yyyy/MM/dd', 'en');

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  if (FromDate <= CurrentDate) {
  //  var time = formatDate(Date.now(), 'yyyy/MM/dd', 'en');

    this.modalRef = this.modalService.show(templateForbidden, {class: 'modal-sm'});
  }

}

confirm(): void {
 this.rentalsService.deleteRentedCar(this.fetchedId)
   .subscribe((data) => {
     console.log(data);
   });

 this.modalRef.hide();
 this.toastr.success('Renting canceled');
 this.router.navigate(['/user/rentals']);
}

confirmForbidden(): void {

  this.modalRef.hide();
  this.router.navigate(['/user/rentals']);
 }

decline(): void {
 this.modalRef.hide();
}
}
