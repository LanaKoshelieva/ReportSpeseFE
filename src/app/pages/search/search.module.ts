import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SearchPage } from './search.page';

import { SearchPageRoutingModule } from './search-routing.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { ReceiptCardModule } from 'src/app/components/receipt-card/receipt-card.module';
import { FilterModalModule } from 'src/app/components/filter-modal/filter-modal.module';
import { ApplNameModule } from 'src/app/components/appl-name/appl-name.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    FooterModule,
    ReceiptCardModule, 
    FilterModalModule,
    ApplNameModule

  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
