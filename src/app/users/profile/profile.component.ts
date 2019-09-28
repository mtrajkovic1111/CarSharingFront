import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageUrl ="/assets/img/avatar.jpg";
  user: any;

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUserByUsername()// returns observable, we need to cast as users array
      .subscribe(
               (data: any) => {
                this.user = data;
                console.log(data);
               },
              (error) => {
                alert('An unexpected error occured');
                console.log(error);
              }
      );

}

onAddCar() {
  this.router.navigate(['/add-car']);
}

onLogout() {
  this.authService.logout();
}

onChangeInfo() {
  this.router.navigate(['profile', this.user.id ], {relativeTo: this.route});
}

}
