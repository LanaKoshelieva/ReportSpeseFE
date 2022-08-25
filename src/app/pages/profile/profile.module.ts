import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { PersonalDataModule } from 'src/app/components/personal-data/personal-data.module';
import { HttpClientModule } from '@angular/common/http';
import { ApplNameModule } from 'src/app/components/appl-name/appl-name.module';
import { GraphicsPageRoutingModule } from '../graphics/graphics-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ProfilePageRoutingModule,
    PersonalDataModule,
    FooterModule,
    ApplNameModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
