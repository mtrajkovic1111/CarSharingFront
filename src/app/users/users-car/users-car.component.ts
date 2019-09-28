import { Component, OnInit, TemplateRef } from '@angular/core';
import { CarService } from 'src/app/service/car.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-car',
  templateUrl: './users-car.component.html',
  styleUrls: ['./users-car.component.css']
})
export class UsersCarComponent implements OnInit {
  userCars;
  table = true;
  config: any;
  carDetails;
  carId: number;
  modalRef: BsModalRef;
  imageUrl ="/assets/img/nopic.png";

  constructor(private carService: CarService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.carService.getAllCarsByUsername()
      .subscribe((data) => {
        console.log(data);
        this.userCars = data;

        this.config = {
          itemsPerPage: 2,
          currentPage: 1,
          totalItems: this.userCars.length
        };
      });
  }

  pageChanged(event) {
   // console.log(event);
    this.config.currentPage = event;

  }

  onDetails(index: number) {
    // console.log(index);
    this.table = false;

    for (let i = 0; i < this.userCars.length; i++) {
      if (this.userCars[i]['id'] == index) {
        this.carDetails = this.userCars[i];
        this.carId = this.carDetails['id'];
      }
      // console.log('Car details' + this.carDetails);
     }
  //  console.log('Car id' + this.carId);
  }

  onBack() {
    this.table = true;
  }

  onDelete(template: TemplateRef<any>) {
     console.log(this.carId);
     this.modalRef = this.modalService.show(template, {class: 'modal-sm'});

  }

  confirm(): void {
    this.carService.deleteUserCar(this.carId)
      .subscribe((data) => {
        console.log(data);
      });
    this.modalRef.hide();
    this.toastr.success('Car successfully deleted');
    this.router.navigate(['/user']);
  }

  decline(): void {
    this.modalRef.hide();
  }

}


