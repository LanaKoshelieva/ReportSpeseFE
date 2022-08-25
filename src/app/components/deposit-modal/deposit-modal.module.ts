import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositModalComponent } from './deposit-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DepositModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DepositModalComponent]
})
export class DepositModalModule { }
