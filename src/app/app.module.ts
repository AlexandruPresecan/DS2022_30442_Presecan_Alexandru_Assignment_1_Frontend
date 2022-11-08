import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DxChartModule } from "devextreme-angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { Devices } from './devices/devices.component';
import { UserService } from '../services/user-service';
import { DeviceService } from '../services/device-service';
import { EnergyConsumptionService } from '../services/energy-consumption-service';
import { DeviceModal } from './device-modal/device-modal.component';
import { DeviceView } from './device-view/device-view.component';
import { ClientGuard } from '../guards/client-guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    Devices,
    DeviceModal,
    DeviceView
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'client/devices', component: Devices, canActivate: [], pathMatch: 'full' },
      { path: 'client/devices/:id', component: DeviceView, canActivate: [], pathMatch: 'full' },
      { path: 'admin/devices', component: Devices, canActivate: [], pathMatch: 'full' },
      { path: 'admin/devices/:id', component: DeviceView, canActivate: [], pathMatch: 'full' },
      { path: 'admin/users', component: DeviceView, canActivate: [], pathMatch: 'full' },
      { path: 'admin/users/:id', component: DeviceView, canActivate: [], pathMatch: 'full' },
    ]),
    DxChartModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    DeviceService,
    EnergyConsumptionService,
    ClientGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
