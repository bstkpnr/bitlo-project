import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkUserSession();
  }

  checkUserSession(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  logout(): void {
    this.clearUserSession();

    this.router.navigate(['/login']);
  }

  clearUserSession(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }
}
