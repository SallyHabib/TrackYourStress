import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { AuthService } from '../services/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private navbarService: NavbarService,
    private authService: AuthService
  ) {
    // change the login-flag when a user logs in
    this.navbarService.getIsLoggedIn().subscribe( newIsLoggedIn => {
        this.isLoggedIn = newIsLoggedIn;
      }
    );
  }

  ngOnInit() {
    // check for an already logged in user
    if (this.authService.isAuthenticated()) {
      this.isLoggedIn = true;
    }
  }

}
