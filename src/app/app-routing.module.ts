import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrAirliquidComponent } from './uicomponent/dr-airliquid/dr-airliquid.component';
import { LoginComponent } from './uicomponent/login/login.component';
import { SelectoptionComponent } from './uicomponent/selectoption/selectoption.component';
import {AuthGuard} from './_services/auth.guard';
const routes: Routes = [
  { path: '', component: SelectoptionComponent,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
{ path: 'mergepdf', component: DrAirliquidComponent,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
