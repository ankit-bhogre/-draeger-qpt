import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrAirliquidComponent } from './uicomponent/dr-airliquid/dr-airliquid.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './uicomponent/login/login.component';
import { SelectoptionComponent } from './uicomponent/selectoption/selectoption.component';
import { HeaderComponent } from './uicomponent/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    DrAirliquidComponent,
    LoginComponent,
    SelectoptionComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  HttpClientModule,
  PdfViewerModule,
  NgxDocViewerModule,
  FormsModule,
  ReactiveFormsModule,
  MatCardModule,
  BrowserAnimationsModule,
  DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
