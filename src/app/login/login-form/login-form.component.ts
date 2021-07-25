import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  
  // To hide or show the password
  hide = true;

  //flag true when user is loggin in
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.logIn();
  }

  logIn() {
    const user: User = {
      id: 0,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    const authData = this.authService.logIn(user);

    this.displayStatusAndNavigate(authData);
  }

  displayStatusAndNavigate(authData: {status: boolean, message: string}) {
    let action = "Yay!"
    if (!status) action = "Okay"
    this.commonService.openSnackbar(authData.message, action);
    this.isSubmitting = false;
    if (authData.status) {
      if (this.authService.returnUrl) {
        this.router.navigateByUrl(this.authService.returnUrl);
      } else {
        this.router.navigate(['/questions']);
      }
    }
  }

}
