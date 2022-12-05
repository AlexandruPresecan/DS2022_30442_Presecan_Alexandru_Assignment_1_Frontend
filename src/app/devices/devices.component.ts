import { Component, ComponentRef, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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

  @Input() devices!: Device[];
  @Input() redirect!: string;
  @Input() admin!: boolean;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('addDeviceModal') addDeviceModal!: DeviceModal;
  @ViewChild('editDeviceModal') editDeviceModal!: DeviceModal;

  private addDeviceTemplate!: Device;

  constructor(private deviceService: DeviceService, private cookieService: CookieService, private router: Router) {

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
        this.onChange.emit();
      }, error => this.addDeviceModal.setError(error.error));
    };

    this.editDeviceModal.onClick = () => {

      const device: Device = this.editDeviceModal.getDevice();

      this.deviceService.updateDevice(device.id, device).subscribe(result => {
        this.editDeviceModal.closeModal();
        this.onChange.emit();
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
    this.router.navigate([this.redirect, id]);
  }

  deleteDevice(device: Device): void {
    this.deviceService.deleteDevice(device.id).subscribe(result => {
      this.onChange.emit();
    }, error => console.log(error.error));
  }
}
