import { AuthService } from './../service/auth.service';
import { Component, OnInit} from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
isAdmin: boolean;
collapsed = true;

  constructor(private authService: AuthService,
              private userService: UserService) { }


ngOnInit() {
this.isAdmin = this.userService.roleMatch(['Admin']);

}
toggleCollapsed(): void {
  this.collapsed = !this.collapsed;

}



}
