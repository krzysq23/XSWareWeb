import { Component, Inject, Renderer2} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth/auth.service';

import { CommonModule } from '@angular/common';
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    FooterComponent, 
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    public location: Location,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.document.title);
    } else {
      console.log('SSR: No document object available');
    }
  }
  title = 'XSWare Solution';
  
  ngOnInit() {
    this.authService.checkAuth();
  }
}
