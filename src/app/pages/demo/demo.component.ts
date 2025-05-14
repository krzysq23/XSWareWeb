import { Component } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-demo',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BsDropdownModule,
    ProgressbarModule,
    TooltipModule,
    PopoverModule,
    CollapseModule,
    TabsModule,
    PaginationModule,
    AlertModule,
    BsDatepickerModule,
    CarouselModule,
    ModalModule,
    ButtonsModule
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  title = 'XSWare Solution';
  isCollapsed = true;
  focus: any;
  focus1: any;
  focus2: any;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  isOn = false;
}
