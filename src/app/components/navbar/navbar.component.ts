import { Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AuthService } from '../../services/auth/auth.service';
import { UserSessionService } from '../../services/session/userSession.service';

@Component({
  selector: 'app-navbar',
  imports: [
    CollapseModule,
    BsDropdownModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCollapsed = true;
  isLoggedIn = false;
  title = 'XSWare Solution';
  email = "";

  constructor(private authService: AuthService, private userSession: UserSessionService) {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.email = userSession.email();
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
