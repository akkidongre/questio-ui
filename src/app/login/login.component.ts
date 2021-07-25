import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  deviceWidth = window.screen.width;
  checkingAutoLogin = true;

  returnUrl: string;

  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    this.deviceWidth = (event.currentTarget as Window).innerWidth;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.authService.returnUrl = this.returnUrl;

    if (this.authService.loggedIn) {
      this.router.navigate(['/questions']);
      this.checkingAutoLogin = false;
    } else {
      this.checkingAutoLogin = this.authService.autoLogin();
    }
  }

}
