import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn2()) {
      this.router.navigate(['login-component']);
    }
  }


}
