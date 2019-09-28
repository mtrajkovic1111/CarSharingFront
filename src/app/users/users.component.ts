import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // public users = [];
  user: {};

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

}
hideCard() {
  this.router.navigate(['/home']);
}



}
