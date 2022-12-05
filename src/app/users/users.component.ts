import { Component, ComponentRef, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Role } from 'src/enums/role';
import { UserService } from 'src/services/user-service';
import { User } from '../../models/user/user';
import { UserModal } from '../user-modal/user-modal.component';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class Users {

  users!: User[];

  @ViewChild('addUserModal') addUserModal!: UserModal;
  @ViewChild('editUserModal') editUserModal!: UserModal;

  private addUserTemplate!: User;

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) {

  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(result => {
      this.users = result;
    }, error => console.log(error));
  }

  ngAfterViewInit(): void {

    this.addUserTemplate = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: Role.Client,
      id: 0
    }

    this.addUserModal.title = "Add User";
    this.editUserModal.title = "Edit User";

    this.addUserModal.passwordMandatory = true;
    this.editUserModal.passwordMandatory = false;

    this.addUserModal.onClick = () => {
      this.userService.createUserAsAdmin(this.addUserModal.getUser()).subscribe(result => {
        this.addUserModal.closeModal();
        this.ngOnInit();
      }, error => {console.log(error.error); this.addUserModal.setError(error.error)});
    };

    this.editUserModal.onClick = () => {

      const user: User = this.editUserModal.getUser();

      this.userService.updateUser(user.id, user).subscribe(result => {
        this.editUserModal.closeModal();
        this.ngOnInit();
      }, error => this.editUserModal.setError(error.error));
    };
  }

  openAddUserModal(): void {
    this.addUserModal.setError("");
    this.addUserModal.setUser(this.addUserTemplate);
    this.addUserModal.openModal();
  }

  openEditUserModal(user: User): void {
    this.editUserModal.setError("");
    this.editUserModal.setUser(user);
    this.editUserModal.openModal();
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(result => {
      this.ngOnInit();
    }, error => console.log(error.error));
  }

  viewUser(id: number): void {
    this.router.navigate(['admin/users/', id]);
  }

  roleToString(role?: number): string {
    return role == 0 ? "Client" : "Admin";
  }
}
