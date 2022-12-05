import { Component } from '@angular/core';
import { Device } from '../../models/device/device';
import { DeviceService } from '../../services/device-service';

@Component({
  selector: 'admin-devices',
  templateUrl: './admin-devices.component.html'
})
export class AdminDevices {

  devices!: Device[];

  constructor(private deviceService: DeviceService) {

  }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe(result => {
      this.devices = result;
    }, error => console.log(error));
  }
}
