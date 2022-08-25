import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApplNameComponent } from './appl-name.component';



@NgModule({
  declarations: [ApplNameComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ApplNameComponent]
})
export class ApplNameModule { }
