import { Component, ElementRef, ViewChild } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Device } from 'src/models/device/device';

@Component({
  selector: 'device-pop-up',
  templateUrl: './device-pop-up.component.html',
  styleUrls: ['./device-pop-up.component.css']
})
export class DevicePopUp {

  @ViewChild('popup') private popup!: ElementRef;

  device?: Device;

  constructor(cookieService: CookieService) {

    if (!cookieService.get("token"))
      return;

    const hubConnection = new HubConnectionBuilder()
    .withUrl('/notify', {
      accessTokenFactory: function () {
        return cookieService.get("token");
      }
    })
    .build();

    hubConnection.on('notify', (data) => {
      this.openPopUp(data);
    });

    hubConnection
    .start()
    .then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err))
  }
  
  openPopUp(device: Device): void {
    this.device = device;
    this.popup.nativeElement.style.display = "block";
  }

  closePopUp(): void {
    this.popup.nativeElement.style.display = "none";
  }
}
