import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {
@ViewChild('f') form: NgForm;
  datePickerConfig: Partial<BsDatepickerConfig>;
  imageUrl = '/assets/img/avatar.jpg';
  selectedFile: File = null;
  fetchedId: number;
  user = {};
  fd = new FormData();
  bday;



  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {

                this.datePickerConfig = Object.assign({}, {
                  containerClass: 'theme-red',
                  showWeekNumbers: false,
                  dateInputFormat: 'DD/MM/YYYY'
                });
              }

    ngOnInit() { // ipak ne treba id
       this.fetchedId = +this.route.snapshot.params.id;
       this.route.params
            .subscribe((params: Params) => {
             this.fetchedId = +params.id;
          });

       this.userService.getUserByUsername()// returns observable, we need to cast as users array
          .subscribe(
                   (data: {}) => {
                    this.user = data;
                    console.log(data);
                   },
                  (error) => {
                    alert('An unexpected error occured');
                    console.log(error);
                  }
          );

    }



  onPicSelected(event) {
   // console.log(event);
   this.selectedFile =  event.target.files[0];

    // show image preview
   if (this.user['profilePicture'] == null) {

    const reader = new FileReader();
    reader.onload = (event: any) => {
       this.imageUrl = event.target.result;
     };
    reader.readAsDataURL(this.selectedFile);
    this.fd.append('uploadedFile', this.selectedFile, this.selectedFile.name);
   }
   if (this.user['profilePicture'] != null) {

    this.user['profilePicture'] = null;
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
     };
    reader.readAsDataURL(this.selectedFile);
    this.fd.append('uploadedFile', this.selectedFile, this.selectedFile.name);

     }

     }


  onSubmit() {

   console.log(this.fetchedId);
   console.log(this.selectedFile);

   if (this.form.controls.bdate.value != null ) {
    this.bday = this.form.controls.bdate.value;
   }
   if (!this.form.controls.bdate.value ) {
    this.bday = this.user['dateOfBirth'];
   }

   const body = {
    name: this.form.controls.name.value,
    surname: this.form.controls.lastname.value,
    dateOfBirth: this.bday,
    email: this.form.controls.email.value,
    username: this.form.controls.username.value,
    contactPhone: this.form.controls.phone.value
  };



  //  console.log('FD  ' + fd.get('uploadedFile'));
  //  console.log('body ' + body);

   if (this.selectedFile != null) {
    this.userService.postUserPicture(this.fetchedId, this.fd )
    .subscribe((data) => {
      console.log(data);

      this.userService.updateUser(this.fetchedId, body)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/user']);
      });
    });
  } else {
    this.userService.updateUser(this.fetchedId, body)
    .subscribe((data) => {
      console.log(data);
      this.router.navigate(['/user']);
    });
  }


  }



}
