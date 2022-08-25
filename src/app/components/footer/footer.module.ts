import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer.component';
import { DepositModalModule } from '../deposit-modal/deposit-modal.module';




@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    DepositModalModule
  ],
  exports:[FooterComponent],
})
export class FooterModule { }
