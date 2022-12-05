import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/models/user/user';
import { UserService } from 'src/services/user-service';
import { Device } from '../../models/device/device';
import { DeviceService } from '../../services/device-service';

@Component({
  selector: 'user-device-mapping',
  templateUrl: './user-device-mapping.component.html'
})
export class UserDeviceMapping {

  devices!: Device[];
  users!: User[];

  @ViewChild('userSelect') userSelect!: ElementRef;
  @ViewChild('deviceSelect') deviceSelect!: ElementRef;
  @ViewChild('message') message!: ElementRef;

  constructor(private deviceService: DeviceService, private userService: UserService) {
    
  }

  ngOnInit(): void {

    this.userService.getUsers().subscribe(result => {
      this.users = result;
    }, error => console.log(error.error));

    this.deviceService.getDevices().subscribe(result => {
      this.devices = result;
    }, error => console.log(error.error));
  }

  mapUserToDevice(): void {
    this.deviceService.userDeviceMapping(this.userSelect.nativeElement.value, this.deviceSelect.nativeElement.value).subscribe(result => {
      console.log(result);
      this.message.nativeElement.innerText = result;
    }, error => this.message.nativeElement.innerText = error.error);
  }
}
