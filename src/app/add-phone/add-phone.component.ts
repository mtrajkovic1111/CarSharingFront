import { UserService } from 'src/app/service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrls: ['./add-phone.component.css']
})
export class AddPhoneComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  user;
  userId: number;
  usersPhone: string = null;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getUserByUsername()
        .subscribe((data) => {
          this.user = data;
          if(this.user['contactPhone'] != null) {
            this.usersPhone = this.user['contactPhone'];
          }
        });
  }

  onUpdate() {
    const body = {
      contactPhone: this.form.controls.phone.value,
    };

    this.userId = this.user['id'];
    console.log('UserIddd' + this.userId);
    this.userService.updateUsersPhone(this.userId, body)
        .subscribe((data) => {
          this.router.navigate(['/user/car']);
        });

  }
}
