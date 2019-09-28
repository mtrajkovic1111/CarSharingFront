import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../service/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }


    signIn(form: NgForm) {

      const credentials = form.value;
      const username = credentials.username;
      const password = credentials.password;
      // console.log(credentials); // {username: "jjkk", password: "qq22"}

      this.authService.userAuthenticate(username, password)
        .subscribe((data: any) => { // it will return json object acces_token...
          // store access token in web browser storage
          console.log(data);
          localStorage.setItem('userToken', data.access_token);
          localStorage.setItem('userName', data.userName);
          localStorage.setItem('role', data.role);
          this.toastr.success('You have successfully logged in!');
          this.router.navigate(['/home']);
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
          this.invalidLogin = true;
        });

    }

    hideCard() {
      this.router.navigate(['/login-signup']);
    }


}




  // signIn(credentials) {
  //   this.authService.login(credentials)
  //     .subscribe(result => {
  //       if (result)
  //         this.router.navigate(['/']);
  //       else
  //         this.invalidLogin = true;
  //     });
  // }
