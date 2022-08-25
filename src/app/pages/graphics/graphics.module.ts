import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphicsPageRoutingModule } from './graphics-routing.module';

import { GraphicsPage } from './graphics.page';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { ApplNameModule } from 'src/app/components/appl-name/appl-name.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphicsPageRoutingModule,
    FooterModule,
    ApplNameModule
    ],
  declarations: [GraphicsPage]
})
export class GraphicsPageModule {}
