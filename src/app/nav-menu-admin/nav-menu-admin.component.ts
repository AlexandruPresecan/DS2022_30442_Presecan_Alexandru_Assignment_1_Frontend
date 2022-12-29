import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/models/user/user';
import { UserService } from 'src/services/user-service';
import { UserModal } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-nav-menu-admin',
  templateUrl: './nav-menu-admin.component.html',
  styleUrls: ['./nav-menu-admin.component.css']
})
export class NavMenuAdminComponent {

  isExpanded = false;
  user!: User;

  @ViewChild('editUserModal') editUserModal!: UserModal;

  constructor(private cookieService: CookieService, private router: Router, private userService: UserService) {
   
  }

  ngOnInit(): void {
    this.userService.getUserById(Number(this.cookieService.get("userId"))).subscribe(result => {
      this.user = result;
    }, error => console.log(error.error));
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  signOut(): void {
    this.cookieService.deleteAll('/', 'localhost', false, 'Lax');
    this.router.navigate(['']);
  }

  ngAfterViewInit(): void {

    this.editUserModal.title = "Change Account Settings";
    this.editUserModal.passwordMandatory = false;
    
    this.editUserModal.onClick = () => {

      const user: User = this.editUserModal.getUser();

      this.userService.updateUser(user.id, user).subscribe(result => {
        this.editUserModal.closeModal();
        this.ngOnInit();
      }, error => this.editUserModal.setError(error.error));
    };
  }

  openMyAccountModal(): void {
    this.editUserModal.setError("");
    this.editUserModal.setUser(this.user);
    this.editUserModal.openModal();
  }
}
