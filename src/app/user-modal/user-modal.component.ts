import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../models/user/user';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModal {

  @ViewChild('modal') private modal!: ElementRef;
  @ViewChild('error') private error!: ElementRef;

  @ViewChild('userName') private userName!: ElementRef;
  @ViewChild('email') private email!: ElementRef;
  @ViewChild('role') private role!: ElementRef;

  private id!: number;

  title!: string;

  onClick(): void {

  }

  openModal(): void {
    this.modal.nativeElement.style.display = "block";
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = "none";
  }

  getUser(): User {
    return {
      userName: this.userName.nativeElement.value,
      email: this.email.nativeElement.value,
      role: this.role.nativeElement.value,
      id: this.id
    }
  }

  setUser(user: User): void {
    this.userName.nativeElement.value = user.userName;
    this.email.nativeElement.value = user.email;
    this.role.nativeElement.value = user.role;
    this.id = user.id ?? 0;
  }

  setError(error: string): void {
    this.error.nativeElement.innerText = error;
  }
}
