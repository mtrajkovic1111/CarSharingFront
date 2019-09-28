import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  constructor(private router: Router) { }


  ngOnInit() {
  }

}
