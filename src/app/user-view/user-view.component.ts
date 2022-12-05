import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDisplay } from 'src/models/user/user-display';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html'
})
export class UserView {

  user!: UserDisplay;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.userService.getUserById(Number(this.activatedRoute.snapshot.paramMap.get("id"))).subscribe(result => {
      this.user = result;
    }, error => console.log(error));
  }

  roleToString(role?: number): string {
    return role == 0 ? "Client" : "Admin";
  }
}
