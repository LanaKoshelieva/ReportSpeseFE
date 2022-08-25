import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { PersonalDataModule } from 'src/app/components/personal-data/personal-data.module';
import { ApplNameModule } from 'src/app/components/appl-name/appl-name.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    PersonalDataModule,
    FooterModule,
    ApplNameModule 

  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}
