import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from "../../models/user/user";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Role } from 'src/enums/role';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent {

  @ViewChild('loginTab') private loginTab!: ElementRef;
  @ViewChild('registerTab') private registerTab!: ElementRef;

  @ViewChild('email') private email!: ElementRef;
  @ViewChild('userName') private userName!: ElementRef;
  @ViewChild('password') private password!: ElementRef;
  @ViewChild('confirmPassword') private confirmPassword!: ElementRef;

  @ViewChild('error') private error!: ElementRef;

  isLoginTab: boolean = true;

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) {

  }

  ngAfterViewInit(): void {
    this.openLoginTab();
  }

  openLoginTab(): void {
    this.loginTab.nativeElement.className = "active-button";
    this.registerTab.nativeElement.className = "";
    this.isLoginTab = true;
  }

  openRegisterTab(): void {
    this.loginTab.nativeElement.className = "";
    this.registerTab.nativeElement.className = "active-button";
    this.isLoginTab = false;
  }

  login(): void {

    const user: User = {
      userName: this.userName.nativeElement.value,
      password: this.password.nativeElement.value,
      id: 0
    };

    this.userService.authenticateUser(user).subscribe(result => {

      this.cookieService.set("token", result.token);
      this.cookieService.set("userId", result.id.toString());
      this.cookieService.set("userName", result.userName.toString());

      if (result.role == Role.Admin)
        this.router.navigate(['admin/devices']);
      else
        this.router.navigate(['client/devices']);
        
    }, error => { console.log(error); this.error.nativeElement.innerText = error.error; });
  }

  register(): void {

    const user: User = {
      userName: this.userName.nativeElement.value,
      email: this.email.nativeElement.value,
      password: this.password.nativeElement.value,
      confirmPassword: this.confirmPassword.nativeElement.value,
      id: 0
    };

    this.userService.createUser(user).subscribe(result => {
      this.userService.authenticateUser(user).subscribe(result => {
        this.cookieService.set("token", result.token);
        this.cookieService.set("userId", result.id.toString());
        if (result.role == Role.Admin)
          this.router.navigate(['admin/devices']);
        else
          this.router.navigate(['client/devices']);
      }, error => { console.log(error.innerText); this.error.nativeElement.innerText = error.error; });
    }, error => { console.log(error.innerText); this.error.nativeElement.innerText = error.error; });
  }
}
