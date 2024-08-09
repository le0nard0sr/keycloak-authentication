import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.scss']
})
export class SecuredComponent {

  authService = inject(AuthService);
  http = inject(HttpClient);

  logout() {
    this.authService.logout()
  }

  get username(): string {
    return this.authService.getUsername();
  }

}
