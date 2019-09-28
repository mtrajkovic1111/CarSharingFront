import { AuthService } from './../service/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  @ViewChild('f') f: NgForm;
  card = false;
  roles: any[];
  userRole: string;


  constructor(private toastr: ToastrService,
              private authService: AuthService,
              private router: Router,
              private userService: UserService) {

    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-red',
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY'
    });
   }

   signIn() {
    //console.log(this.f);
    let newUser = {
      firstname: this.f.controls.name.value,
      lastname: this.f.controls.lastname.value,
      dateOfBirth: this.f.controls.bdate.value,
      email: this.f.controls.email.value,
      username: this.f.controls.username.value,
      password: this.f.controls.password.value,
      confirmPassword: this.f.controls.password1.value,
      roles: this.userRole
    };
    console.log(newUser);
    this.authService.registerUser(newUser)
      .subscribe((data: any) => { // should return IdentityResult
        console.log(data);
        if (data.succeeded == true) {
           this.f.reset();
           this.toastr.success('You have successfully registered!');
           this.router.navigate(['/home']);
           }
        else {
          this.toastr.error(data.Errors[0]);
        }
          });
   }
   ngOnInit() {
    this.userService.getAllRoles()
        .subscribe((data: any) => {
          this.roles = data;
         // console.log('Roles' + this.roles);
          // user role is default, and its second role
          this.userRole = this.roles[1]['name'];
         console.log('userRoles' + this.userRole);
        });

   }

   hideCard() {
    this.router.navigate(['/login-signup']);
  }

}



