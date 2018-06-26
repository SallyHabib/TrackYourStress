import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private navbarService: NavbarService
  ) { }

  ngOnInit() {
    this.logout();
    this.router.navigate(['/home']);
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('token');
    this.navbarService.loginUser(false);
  }

}
