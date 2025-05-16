import { Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    CollapseModule,
    BsDropdownModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCollapsed = true;
  isLoggedIn = false;
  title = 'XSWare Solution';
  UserName = localStorage.getItem('userName');

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  @HostListener("window:scroll", ["$event"])

  onWindowScroll = (): void => {
    if (window.pageYOffset > 100) {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.remove("navbar-transparent");
        element.classList.add("bg-danger");
      }
    } else {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-danger");
      }
    }
  }

  logoutClick(): void {
    this.authService.logout();
  }

}
