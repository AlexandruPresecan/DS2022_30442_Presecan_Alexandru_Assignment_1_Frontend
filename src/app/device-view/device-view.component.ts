import { ElementRef, ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "src/services/user-service";
import { Device } from "../../models/device/device";
import { DeviceService } from "../../services/device-service";
import { EnergyConsumptionService } from "../../services/energy-consumption-service";

@Component({
  selector: 'device-view',
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.css']
})
export class DeviceView {

  device!: Device;
  chartData!: any;

  @ViewChild('datePicker') private datePicker!: ElementRef;

  constructor(private deviceService: DeviceService, private energyConsumptionService: EnergyConsumptionService, private userService: UserService, private cookieService: CookieService, private activatedRoute : ActivatedRoute, private router: Router) {
    
  }
  
  ngAfterViewInit(): void {
    this.deviceService.getDeviceById(Number(this.activatedRoute.snapshot.paramMap.get("id"))).subscribe(result => {

      this.userService.isAdminAuthenticated().subscribe(result => {
      }, error => {
        if (result.userId?.toString() != this.cookieService.get("userId"))
          this.router.navigate(["client", "devices"]);
      });

      this.device = result;
      this.loadChartData();
    }, error => console.log(error));
  }

  loadChartData(): void {

    const date = this.datePicker.nativeElement.value == "" ? new Date() : this.datePicker.nativeElement.value;

    this.energyConsumptionService.getEnergyConsumptions(this.device.id, date).subscribe(result => {

      this.device.energyConsumptions = result;

      this.chartData = this.device
        ?.energyConsumptions
        ?.map(energyConsumption => {
          return {
            timeStamp: new Date(energyConsumption.timeStamp),
            energyConsumptionValue: energyConsumption.energyConsumptionValue
          };
        });
    }, error => console.log(error));
  }
}
