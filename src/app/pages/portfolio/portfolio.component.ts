import { Component } from '@angular/core';
import { TabsModule } from "ngx-bootstrap/tabs";
import { CarouselModule } from "ngx-bootstrap/carousel";

@Component({
  selector: 'app-portfolio',
  imports: [ 
    TabsModule,
    CarouselModule
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

}
