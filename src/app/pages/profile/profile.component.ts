import { Component } from '@angular/core';
import { TabsModule } from "ngx-bootstrap/tabs";
import { UserSessionService } from '../../services/userSession.service';

@Component({
  selector: 'app-profile',
  imports: [ TabsModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userData = {} as any;

  constructor(private userSession: UserSessionService) {
    this.userData = userSession.userData();
  }
}
