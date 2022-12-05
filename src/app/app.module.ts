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
import { UserModal } from './user-modal/user-modal.component';
import { Users } from './users/users.component';
import { NavMenuAdminComponent } from './nav-menu-admin/nav-menu-admin.component';
import { AdminGuard } from 'src/guards/admin-guard';
import { ClientDevices } from './client-devices/client-devices.component';
import { AdminDevices } from './admin-devices/admin-devices.component';
import { UserView } from './user-view/user-view.component';
import { UserDeviceMapping } from './user-device-mapping/user-device-mapping.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    NavMenuAdminComponent,
    HomeComponent,
    Devices,
    DeviceModal,
    DeviceView,
    UserModal,
    Users,
    ClientDevices,
    AdminDevices,
    UserView,
    UserDeviceMapping
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'client/devices', component: ClientDevices, canActivate: [ClientGuard], pathMatch: 'full' },
      { path: 'client/devices/:id', component: DeviceView, canActivate: [ClientGuard], pathMatch: 'full' },
      { path: 'admin/devices', component: AdminDevices, canActivate: [AdminGuard], pathMatch: 'full' },
      { path: 'admin/devices/:id', component: DeviceView, canActivate: [AdminGuard], pathMatch: 'full' },
      { path: 'admin/users', component: Users, canActivate: [AdminGuard], pathMatch: 'full' },
      { path: 'admin/users/:id', component: UserView, canActivate: [AdminGuard], pathMatch: 'full' },
      { path: 'admin/user-device-mapping', component: UserDeviceMapping, canActivate: [AdminGuard], pathMatch: 'full' },
    ]),
    DxChartModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    DeviceService,
    EnergyConsumptionService,
    ClientGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
