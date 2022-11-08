import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Device } from "../models/device/device";
import { apiUrl } from "../environments/environment";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class DeviceService {

  private jsonOptions!: {};
  private textOptions!: {};

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {

    this.jsonOptions = {
      responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookieService.get("token")
      })
    };

    this.textOptions = {
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookieService.get("token")
      })
    };
  }

  public getDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(apiUrl + "/api/device", this.jsonOptions);
  }

  public getDeviceById(id: number): Observable<Device> {
    return this.httpClient.get<Device>(apiUrl + "/api/device/" + id, this.jsonOptions);
  }

  public getDeviceByUserId(id: number): Observable<Device> {
    return this.httpClient.get<Device>(apiUrl + "/api/device/" + id, this.jsonOptions);
  }

  public createDevice(device: Device): Observable<Device> {
    return this.httpClient.post<Device>(apiUrl + "/api/device", device, this.jsonOptions);
  }

  public updateDevice(id: number, device: Device): Observable<Device> {
    return this.httpClient.put<Device>(apiUrl + "/api/device/" + id, device, this.jsonOptions);
  }

  public deleteDevice(id: number): Observable<string> {
    return this.httpClient.delete<string>(apiUrl + "/api/device/" + id, this.textOptions);
  }
}
