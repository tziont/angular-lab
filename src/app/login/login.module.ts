import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module'

@NgModule({
  declarations: [
    LoginComponent,
   ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
})
export class LoginModule {}