import { Component, HostListener} from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";

@Component({
  selector: 'app-navbar',
  imports: [
    CollapseModule,
    BsDropdownModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCollapsed = true;
  title = 'XSWare Solution';
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

}
