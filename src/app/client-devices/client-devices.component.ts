import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Device } from '../../models/device/device';
import { DeviceService } from '../../services/device-service';

@Component({
  selector: 'client-devices',
  templateUrl: './client-devices.component.html'
})
export class ClientDevices {

  devices!: Device[];

  constructor(private deviceService: DeviceService, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.deviceService.getDevicesByUserId(Number(this.cookieService.get("userId"))).subscribe(result => {
      this.devices = result;
    }, error => console.log(error));
  }
}
