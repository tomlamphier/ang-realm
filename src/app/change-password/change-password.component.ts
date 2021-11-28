import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userCredentials = {password: '', retype: ''};
  formGroup = {} as FormGroup;
  failedChange = "";

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      password: new FormControl(this.userCredentials.password,
        {
          validators:
            [Validators.required],
          updateOn: 'blur'
        }),
      retype: new FormControl(this.userCredentials.retype,
        {
          validators:
            [Validators.required],
          updateOn: 'blur'
        })
    });
  }

  onSubmit() {
    this.failedChange = "";
    let res = this.authService.changePassword(this.formGroup.controls['password'].value);
    res.then(() => {
      this.router.navigate(['']);
    }).catch(err => {
      this.failedChange = "Error occurred while attempting to change your password";
    })
  }

  get password() {
    return this.formGroup.controls['password'];}
  get retype() {
    return this.formGroup.controls['retype'];}
}
