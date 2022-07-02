import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SafeUrlPipe } from './pipe/safe-url.pipe';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    PokemonItemComponent,
    SafeUrlPipe,
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    NzCardModule,
    NzModalModule,
    NzButtonModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    PokemonItemComponent,
    SafeUrlPipe
  ]
})
export class SharedModule { }
