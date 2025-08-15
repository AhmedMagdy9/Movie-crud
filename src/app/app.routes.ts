import { Routes } from '@angular/router';
import { HomeComponent } from './feature/pages/home/home.component';
import { RegisterComponent } from './feature/pages/register/register.component';
import { LoginComponent } from './feature/pages/login/login.component';
import { urlGuard } from './core/guards/url/url.guard';
import { DashbordComponent } from './feature/pages/dashbord/dashbord.component';

export const routes: Routes = [
     {path:"" , redirectTo:"home" , pathMatch:"full"},
    {path: 'home' , component: HomeComponent ,canActivate:[urlGuard] , title : 'Home'},
    {path: 'dashbord' , component: DashbordComponent ,canActivate:[urlGuard] , title : 'Dashbord'},
    {path: 'register' , component: RegisterComponent , title : 'Register'},
    {path: 'login' , component: LoginComponent , title : 'Login'}
  
];
