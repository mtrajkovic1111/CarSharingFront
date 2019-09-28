import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  collapsed = true;
  user: any;
  totalUsers;

  constructor(private router: Router,
              private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserByUsername()
        .subscribe((data) => {
        this.user = data;
        });

    this.userService.getTotalNumberOfUsers()
        .subscribe((data) => {
          console.log('totaaal' + data);
          this.totalUsers = data;
        });
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;

  }

}
