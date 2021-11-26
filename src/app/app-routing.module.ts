import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent} from "./hello/hello.component";
import { LoginComponent} from "./login/login.component";
import { HomeComponent} from "./home/home.component";
import { RegisterComponent} from "./register/register.component";
import { ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  {path: 'login-component', component: LoginComponent },
  {path: 'hello-component', component: HelloComponent},
  {path: 'register-component', component: RegisterComponent},
  {path: 'change-password-component', component: ChangePasswordComponent },
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
