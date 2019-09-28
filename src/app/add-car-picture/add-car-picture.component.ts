import { Router } from '@angular/router';
import { CarService } from 'src/app/service/car.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-car-picture',
  templateUrl: './add-car-picture.component.html',
  styleUrls: ['./add-car-picture.component.css']
})
export class AddCarPictureComponent implements OnInit {
  imageUrl = '/assets/img/Los-mas-caros.jpg';
  selectedFile: File = null;
  fetchedId: number;
  fd = new FormData();

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private carService: CarService,
              private router: Router) { }

  ngOnInit() {
    this.fetchedId = +this.route.snapshot.params['id'];
    this.route.params
      .subscribe((params: Params) => {
        this.fetchedId = +params['id'];
      });
  }

  onPicSelected(event) {

    this.selectedFile =  event.target.files[0];

     // show image preview

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      };
    reader.readAsDataURL(this.selectedFile);
    this.fd.append('uploadedFile', this.selectedFile, this.selectedFile.name);
    }

    onAddPicture() {

      if (this.selectedFile != null) {
        this.carService.postCarPicture(this.fetchedId, this.fd )
        .subscribe((data) => {
           console.log(data);
           this.router.navigate(['/add-phone']);
        });

      }

      if (this.selectedFile == null) {
          this.router.navigate(['/add-phone']);
        }
      }

    }



