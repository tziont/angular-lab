import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './auth-routing.module'

@NgModule({
  declarations: [
    AuthComponent,
   ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
})
export class LoginModule {}