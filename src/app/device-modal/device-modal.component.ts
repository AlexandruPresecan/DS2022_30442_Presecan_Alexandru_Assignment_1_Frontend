import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Device } from '../../models/device/device';

@Component({
  selector: 'device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.css']
})
export class DeviceModal {

  @ViewChild('modal') private modal!: ElementRef;
  @ViewChild('error') private error!: ElementRef;

  @ViewChild('description') private description!: ElementRef;
  @ViewChild('address') private address!: ElementRef;
  @ViewChild('maximumHourlyEnergyConsumption') private maximumHourlyEnergyConsumption!: ElementRef;

  private id!: number;
  private userId!: number;

  title!: string;

  onClick(): void {

  }

  openModal(): void {
    this.modal.nativeElement.style.display = "block";
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = "none";
  }

  getDevice(): Device {
    return {
      description: this.description.nativeElement.value,
      address: this.address.nativeElement.value,
      maximumHourlyEnergyConsumption: this.maximumHourlyEnergyConsumption.nativeElement.value,
      id: this.id,
      userId: this.userId
    }
  }

  setDevice(device: Device): void {
    this.description.nativeElement.value = device.description;
    this.address.nativeElement.value = device.address;
    this.maximumHourlyEnergyConsumption.nativeElement.value = device.maximumHourlyEnergyConsumption
    this.id = device.id;
    this.userId = device.userId;
  }

  setError(error: string): void {
    this.error.nativeElement.innerText = error;
  }
}
