import { Component, ComponentRef, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Device } from '../../models/device/device';
import { DeviceService } from '../../services/device-service';
import { DeviceModal } from '../device-modal/device-modal.component';

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class Devices {

  devices!: Device[];

  @ViewChild('addDeviceModal') addDeviceModal!: DeviceModal;
  @ViewChild('editDeviceModal') editDeviceModal!: DeviceModal;

  private addDeviceTemplate!: Device;

  constructor(private deviceService: DeviceService, private cookieService: CookieService, private router: Router) {

  }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe(result => {
      this.devices = result;
    }, error => console.log(error));
  }

  ngAfterViewInit(): void {

    this.addDeviceTemplate = {
      description: "",
      address: "",
      maximumHourlyEnergyConsumption: 1,
      userId: Number(this.cookieService.get("userId")),
      id: 0
    }

    this.addDeviceModal.title = "Add Device";
    this.editDeviceModal.title = "Edit Device";

    this.addDeviceModal.onClick = () => {
      this.deviceService.createDevice(this.addDeviceModal.getDevice()).subscribe(result => {
        this.addDeviceModal.closeModal();
        this.ngOnInit();
      }, error => this.addDeviceModal.setError(error.error));
    };

    this.editDeviceModal.onClick = () => {

      const device: Device = this.editDeviceModal.getDevice();

      this.deviceService.updateDevice(device.id, device).subscribe(result => {
        this.editDeviceModal.closeModal();
        this.ngOnInit();
      }, error => this.editDeviceModal.setError(error.error));
    };
  }

  openAddDeviceModal(): void {
    this.addDeviceModal.setError("");
    this.addDeviceModal.setDevice(this.addDeviceTemplate);
    this.addDeviceModal.openModal();
  }

  openEditDeviceModal(device: Device): void {
    this.editDeviceModal.setError("");
    this.editDeviceModal.setDevice(device);
    this.editDeviceModal.openModal();
  }

  viewDevice(id: number): void {
    this.router.navigate(['client/devices/', id]);
  }
}
