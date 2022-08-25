import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReceiptCardComponent } from './receipt-card.component';




@NgModule({
  declarations: [ReceiptCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    ReceiptCardComponent
  ]
})
export class ReceiptCardModule { }
