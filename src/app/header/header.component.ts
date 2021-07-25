import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authStatusSub: Subscription;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.authStatus.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    if (this.authStatusSub) {
      this.authStatusSub.unsubscribe();
    }
  }

}
