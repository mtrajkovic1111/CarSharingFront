import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  clicked = false;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onLogin() {
    this.clicked = true;
    this.router.navigate(['/login']);
  }

  onSignup() {
    this.clicked = true;
    this.router.navigate(['/signup']);
  }

}
