import { Component, ViewChild } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { DevicePopUp } from './device-pop-up/device-pop-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'app';

  private hubConnection!: HubConnection;
  
  @ViewChild('devicePopUp') devicePopUp!: DevicePopUp;

  constructor(cookieService: CookieService) {

    if (!cookieService.get("token"))
      return;

    this.hubConnection = new HubConnectionBuilder()
    .withUrl(environment.apiUrl + '/notify', {
      accessTokenFactory: function () {
        return cookieService.get("token");
      }
    })
    .build();

    this.hubConnection
    .start()
    .then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err))

    this.hubConnection.on('notify', (data) => {
      this.devicePopUp.openPopUp(data);
    });
  }
}
