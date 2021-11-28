import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router) { }
  userCredentials = {email: '', password: ''};
  formGroup = {} as FormGroup;
  logonTitle = "Logon";
  failedLogin = "";

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      emailID: new FormControl(this.userCredentials.email,
        { validators:
            [
              Validators.required,
              Validators.email
            ],
          updateOn: 'blur'
        }),
      password: new FormControl(this.userCredentials.password,
        { validators:
            [Validators.required],
          updateOn: 'blur'
        })
    });
  }
  showRetype = false;
  showChangePassword = false;
  onSubmit() {
    this.failedLogin = "";
    if (this.formGroup.valid) {
      let usr = this.formGroup.controls['emailID'].value;
      let psw = this.formGroup.controls['password'].value;
      let res = this.authService.login(usr, psw);
      res.then(r => {
          this.router.navigate(['']);
      }).catch(err => {
        this.failedLogin = err;
      });
    }
  }

  onRegister() {
    this.router.navigate(['register-component']);
  }

  get emailID() {
    return this.formGroup.controls['emailID'];}
  get password() {
    return this.formGroup.controls['password'];}
}
