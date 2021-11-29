import {Injectable, OnInit} from '@angular/core';
import * as Realm from "realm-web";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) { }

  app: Realm.App = new Realm.App({ id: "indigo-app-jlzlg" });
  user =  {} as Realm.User;
  loggedIn = false;
  email = "";

  login (emailID: string, password: string): Promise<string> {
    const credentials = Realm.Credentials.emailPassword(emailID, password);
    let u = this.app.logIn(credentials);
    return new Promise<string>((resolve, reject) => {
      u.then(r => {
        this.user = r;
        this.loggedIn = true;
        resolve("success")
      }).catch(err => {
        reject("Login failed");
      })
    });
  }

  isLoggedIn() {
    return this.app.currentUser != null;
  }

  getUser() {
    return this.app.currentUser;
  }
  async logout() {
    await this.app.currentUser?.logOut();
  }

  sendCode(email: string, code: string) {
    let query = "http://newindigommt.com:5000?email=" + email + "&code=" + code;
    return this.http.get(query, {responseType: "text"}).toPromise();
  }

  register(emailID: string, password: string): Promise<void> {
    return this.app.emailPasswordAuth.registerUser(emailID, password);
  }


  changePassword(password: string): Promise<void> {
    let res = this.app.currentUser!.functions.callFunction("getEmail", this.app.currentUser!.id);
    let res2 = res.then(r => {
      this.app.emailPasswordAuth.callResetPasswordFunction(r.email, password);
    });
    return res2;
  }
}

