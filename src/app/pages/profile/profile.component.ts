import { Component } from '@angular/core';
import { TabsModule } from "ngx-bootstrap/tabs";

@Component({
  selector: 'app-profile',
  imports: [ TabsModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  FirstName = 'Jan';
  LastName = 'Kowalski';
  Email = "kontakt@xsware.pl";
  Phone = "";
}
