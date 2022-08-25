import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SearchPage } from 'src/app/pages/search/search.page';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() search:SearchPage;
  @Input() page:string;

  colorHome = '';
  colorSearch = '';
  colorGraphics = '';
  colorUser = '';

  constructor(private modalController: ModalController,
              private route: Router,
              )  
              {}

  ngOnInit() 
  {
    if (this.page == "home")
    {
      this.colorHome = "secondary"
    }
    else if (this.page == "search")
    {
      this.colorSearch = "secondary"
    }
    else if (this.page == "graphics")
    {
      this.colorGraphics = "secondary"
    }
    else if (this.page == "user")
    {
      this.colorUser = "secondary"
    }
  }


  async newReceipt()
  {
    const modal = await this.modalController.create
    ({
      component: DepositModalComponent
      
    })
    modal.onDidDismiss().then((d: any)  => {
      if(this.search)
    {
      this.search.reload(d);

    }}
    );
    modal.present();
  }

  changePage(page) 
  {
    this.route.navigate([`/${page}`]);
    console.log(page)
  }

}
