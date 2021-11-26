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

  async login (emailID: string, password: string): Promise<string> {
    this.email = emailID;
    const credentials = Realm.Credentials.emailPassword(emailID, password);
    let result = "";
    try {
      const u: Realm.User = await this.app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      //assert(user.id === app.currentUser.id)
      this.user = u;
      this.loggedIn = true;
      result = "success";
    } catch(err) {
      this.user = {} as Realm.User;
      this.loggedIn = false;
      result = err.error;
    }
    return new Promise(resolve => {
      resolve(result);
    })
  }
  
  isLoggedIn2() {
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

  async register(emailID: string, password: string): Promise<string> {
    let result = "";
    try {
      let res = await this.app.emailPasswordAuth.registerUser(emailID, password);
      result = "success";
    } catch(err) {
      result = err.error;
    }
    return new Promise(resolve => {
      resolve(result);
    })

  }

  async changePassword(password: string): Promise<string> {
    let result = "";
    try {
      let res = await this.app.emailPasswordAuth.callResetPasswordFunction(this.email, password);
      result = "success";
    } catch(err) {
      result = err.error;
    }
    return new Promise(resolve => {
      resolve(result);
    })

  }


}

