import { Component } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService,
              private router: Router) {
  }
  title = 'My Application';
  noUser = true;
  onClick() {
    let res = this.authService.logout();
    res.then(r => {
      this.router.navigate(['login-component']);
    })
  }
}
