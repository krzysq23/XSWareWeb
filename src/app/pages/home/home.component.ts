import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '../../services/platform.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private platformService: PlatformService,
    private route: ActivatedRoute, 
    public toastr: ToastrService,
    private notificationService: NotificationService
  ) {}
  title = 'XSWare Solution';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const isLogout = params['logout'] === 'true';
      if (isLogout) {
        this.toastr.info('Zostałeś wylogowany.', 'Info', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.notificationService.setShowLogoutToast(false);
      }
    });
  }

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