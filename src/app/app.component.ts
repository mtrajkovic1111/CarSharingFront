import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CarSharingFront';
  welcome = true;
  constructor(private router: Router) {}



  navigate() {
    this.welcome = false;
    this.router.navigate(['/login-signup']);
  }

  setMyStyles() {
    const styles = {
      height: this.welcome === true ? '550px' : '670px'
    };
    return styles;

  }







}
