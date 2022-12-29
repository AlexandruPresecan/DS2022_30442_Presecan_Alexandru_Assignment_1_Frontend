import { Component, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Device } from 'src/models/device/device';
import { HelloReply, HelloRequest } from 'src/protos/greet_pb';
import { GreeterClient, ServiceError } from 'src/protos/greet_pb_service';
import { grpc } from "@improbable-eng/grpc-web";

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class Chat {

  @ViewChild('popup') private popup!: ElementRef;

  device?: Device;

  constructor(cookieService: CookieService) {

    //if (!cookieService.get("token"))
    //  return;

    const client = new GreeterClient('https://localhost:7263');
    const req = new HelloRequest();
    req.setName("World!");
    client.sayHello(req, response => console.log(response)) 
    //(err: ServiceError | null, response: HelloReply | null) => {
    //  if (err) {
    //    console.log(err)
    //    return;
    //  }
    //  console.log(response?.getMessage());
    //});
  }
}
