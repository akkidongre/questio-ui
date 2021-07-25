import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { CommonService } from "../shared/common.service";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private users: User[] = [
        {
            id: 1,
            email: "test1@test.com",
            password: "test1@test.com"
        },
        {
            id: 2,
            email: "test2@test.com",
            password: "test2@test.com"
        }
    ];

    private currentUser: User;
    authStatus = new BehaviorSubject<boolean>(false);
    loggedIn = false;

    authTimer: ReturnType<typeof setTimeout>;

    defaultExpirySeconds = 7200;

    returnUrl: string;

    constructor(
        private commonService: CommonService,
        private router: Router
    ) {}

    logIn(userData: User) {
        for (let user of this.users) {
            if (user.email === userData.email && user.password === userData.password) {
                this.currentUser = user;

                const now = new Date();
                const expirationDate = new Date(now.getTime() + this.defaultExpirySeconds * 1000);
                this.setAuthTimer(this.defaultExpirySeconds);
                this.saveUserData(expirationDate);

                this.authStatus.next(true);
                this.loggedIn = true;

                return {
                    status: true,
                    message: `Hi ${user.email}, Welcome to Questio`
                }
            }
        }

        return {
            status: false,
            message: "Please check your email or password"
        }
    }

    logOut() {
        if (this.authTimer) clearTimeout(this.authTimer);
          
        this.clearUserData();
        this.loggedIn = false;
        this.authStatus.next(false);
      
        this.commonService.openSnackbar("You have been logged out");
      
        this.router.navigate(['/']);
    }

    autoLogin(): boolean {
        const currentUserString = localStorage.getItem("logged_in_user");
        const expirationDateString = localStorage.getItem("expiration_date");
        if (!currentUserString || !expirationDateString) {
            return false;
        }

        const expirationDate = new Date(expirationDateString);
        const now = new Date();
        const timeDiff = expirationDate.getTime() - now.getTime();

        if (timeDiff > 0) {
            const userObj = JSON.parse(currentUserString);
            for (let user of this.users) {
                if (user.id === userObj.id) { 
                    userObj.password = user.password;
                    break;
                }
            }
            this.currentUser = userObj;
            this.loggedIn = true;
            this.authStatus.next(true);
            this.setAuthTimer(timeDiff/1000);
            if (this.returnUrl) {
                this.router.navigateByUrl(this.returnUrl);
            } else {
                this.router.navigate(['/questions']);
            }
            return true;
        }

        this.clearUserData();
        return false;
    }

    autoLogout() {

    }

    setAuthTimer(expiresIn: number) {
        this.authTimer = setTimeout(() => {
          this.logOut();
        }, expiresIn*1000);
    }

    saveUserData(expirationDate: Date) {
        const userDataToStore = {
            id: this.currentUser.id,
            email: this.currentUser.email
        }
        localStorage.setItem("logged_in_user", JSON.stringify(userDataToStore));
        localStorage.setItem("expiration_date", expirationDate.toISOString());
    }

    clearUserData() {
        this.currentUser = {
            id: 0,
            email: '',
            password: ''
        }
        localStorage.removeItem("logged_in_user");
        localStorage.removeItem("expiration_date");
    }
}