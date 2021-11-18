import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { IonicStorageModule } from '@ionic/storage-angular';

import { Device } from '@ionic-native/device/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HammerModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    Storage,
    Device,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
