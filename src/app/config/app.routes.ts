import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component'; 
import { DemoComponent } from '../pages/demo/demo.component'; 
import { ContactComponent } from '../pages/contact/contact.component';
import { AboutComponent } from '../pages/about/about.component'; 
import { RegisterComponent } from '../pages/register/register.component'; 
import { LoginComponent } from '../pages/login/login.component'; 
import { ProfileComponent } from '../pages/profile/profile.component'; 

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'demo', component: DemoComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent }
];
