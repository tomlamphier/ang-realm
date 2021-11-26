import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn2()) {
        this.router.navigate(['hello-component']);
    } else {
        this.router.navigate(['login-component']);
    }
  }
}
