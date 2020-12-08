import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { P1DataComponent } from './p1-data/p1-data.component';
import {HttpClientModule} from '@angular/common/http';
import { P2DataComponent } from './p2-data/p2-data.component'

@NgModule({
  declarations: [
    AppComponent,
    P1DataComponent,
    P2DataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
