import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    HomeComponent,
    BreadcrumbComponent,
   ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutRoutingModule,
  ],
})
export class LayoutModule {}