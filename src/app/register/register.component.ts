import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router) { }
  userCredentials = {email: '', password: '', retype: '', verify: ''};
  formGroup = {} as FormGroup;
  failedRegistration = "";
  verificationStep = false;
  code = 0;

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
        }),
      retype: new FormControl(this.userCredentials.retype,
        { validators:
            [Validators.required],
          updateOn: 'blur'
        }),
      verify: new FormControl(this.userCredentials.verify)
    });
    this.verificationStep = false;
  }
  onSubmit() {
    this.formGroup.markAllAsTouched();
    this.failedRegistration = "";
    if (this.verificationStep) {
      this.onSubmitVerification();
      return;
    }
    if (!this.formGroup.valid) {
      return;
    }
    if (this.formGroup.controls['password'].value !=
      this.formGroup.controls['retype'].value) {
      return;
    }
    this.code = Math.floor(Math.random() * 100000);
    this.verificationStep = true;

    let e = this.formGroup.controls['emailID'].value;
    let c = this.code.toString();
    this.authService.sendCode(e, c)
      .then((data) => {
      })
      .catch((error) => {
        this.failedRegistration = error.statusText;
      });
  }

  onSubmitVerification() {
    this.failedRegistration = "";
    let cd = parseInt(this.formGroup.controls['verify'].value)
    if (isNaN(cd)) {
      this.failedRegistration = "Verification code does not match";
    } else if (this.code != cd) {
      this.failedRegistration = "Verification code does not match";
    } else {
      let e = this.formGroup.controls['emailID'].value;
      let p = this.formGroup.controls['password'].value;
      let res = this.authService.register(e,p);
      res.then(r => {
        if (r == 'success') {
          let res2 = this.authService.login(e,p);
          res2.then(r2 => {
            if (r2 == 'success') {
              this.router.navigate(['']);
            } else {
              this.failedRegistration = "Registration failed: " + r2;
            }
          })
        } else {
          console.log('registration failed');
          this.failedRegistration = "Registration failed: " + r;
        }
      });
    }
  }

  onAlready() {
    this.router.navigate(['login-component']);
  }

  get emailID() {
    return this.formGroup.controls['emailID'];}
  get password() {
    return this.formGroup.controls['password'];}
  get retype() {
    return this.formGroup.controls['retype'];}
}
