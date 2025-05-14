import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  constructor(
    private platformService: PlatformService
  ) {}
  title = 'XSWare Solution';

  ngAfterViewInit() {
    const doc = this.platformService.getDocument();
    if (doc) {
      var body = document.getElementsByTagName("body")[0];
      body.classList.add("index-page");
    }
  }

  ngOnDestroy() {
    const doc = this.platformService.getDocument();
    if (doc) {
      var body = document.getElementsByTagName("body")[0];
      body.classList.remove("index-page");
    }
  }
}