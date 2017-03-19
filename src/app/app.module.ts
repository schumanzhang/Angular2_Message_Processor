import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SelectModule } from 'ng-select';
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { ProcessorComponent } from './components/processor/processor.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './layouts/navbar.component';
import { PanelComponent } from './components/panel/panel.component';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ProcessorComponent,
    AboutComponent,
    NavbarComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SelectModule,
    MyDatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
