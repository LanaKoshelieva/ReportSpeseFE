import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { ApplNameModule } from 'src/app/components/appl-name/appl-name.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FooterModule,
    ApplNameModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
