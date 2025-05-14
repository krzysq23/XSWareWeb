import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component'; 
import { DemoComponent } from '../pages/demo/demo.component'; 
import { ContactComponent } from '../pages/contact/contact.component';
import { AboutComponent } from '../pages/about/about.component'; 

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'demo', component: DemoComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent }
];
