import { HomeComponent } from './pages/home/home.component';
import { TrailerComponent } from './components/trailer/trailer.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { ItemComponent } from './components/item/item.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    TrailerComponent,
    HomeComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CarouselModule,
    NzCardModule,
    NzButtonModule,
  ]
})
export class HomeModule { }
