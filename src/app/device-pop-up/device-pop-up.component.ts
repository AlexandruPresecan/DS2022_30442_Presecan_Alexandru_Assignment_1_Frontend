import { Component, ElementRef, ViewChild } from '@angular/core';
import { Device } from 'src/models/device/device';

@Component({
  selector: 'device-pop-up',
  templateUrl: './device-pop-up.component.html',
  styleUrls: ['./device-pop-up.component.css']
})
export class DevicePopUp {

  @ViewChild('popup') private popup!: ElementRef;

  device?: Device;

  openPopUp(device: Device): void {
    this.device = device;
    this.popup.nativeElement.style.display = "block";
  }

  closePopUp(): void {
    this.popup.nativeElement.style.display = "none";
  }
}
