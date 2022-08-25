import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DepositModalComponent } from 'src/app/components/deposit-modal/deposit-modal.component';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';
import { FilterDTO } from 'src/app/model/DTO/filter-dto';
import { ReceiptDTO } from 'src/app/model/DTO/receipt-dto';
import { ResponseDTO } from 'src/app/model/DTO/response-dto';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {

  id:number = +localStorage.getItem("userId")
  receiptsList:ReceiptDTO[] = [];

  sortOrder: string = null;

  constructor(private searchService: SearchService,
              private alertService: AlertService,
              private alertController: AlertController,
              private modalController: ModalController,
              private loginService:LoginService              
              ) {}

  ionViewWillEnter() 
  {
    this.getMyReceipts(this.id);
  }

  ngOnInit() 
  {
  }

  getMyReceipts(id:number, filter:FilterDTO = null)
  {
    if(filter == null)
    {
      filter = new FilterDTO;
    }

    filter.userId = id;
    this.searchService.myReceipts(filter).subscribe(async response =>
      {
        const r:ResponseDTO = response as ResponseDTO;
        if(await this.loginService.checkResponse(r) == false)
        {
          return
        }
        
        if(r.code == 200)
        {
          const receipt:ReceiptDTO[] = r.data as ReceiptDTO[];
          this.receiptsList = receipt;
          if(this.sortOrder)
          {
            this.sort(this.sortOrder)
          }
        }
        else
        {
          this.alertService.showAlert('Ooops', 'Something went wrong', r.message , this.alertController)
        }    
    },
      error=>
      {
        this.alertService.showAlert('Ooops', 'Something went wrong', error.error.message , this.alertController)
      })   
  }

  async details(receipt:ReceiptDTO)
  {
    const modal = await this.modalController.create
    ({
      component: DepositModalComponent,
      componentProps: 
      { 
        receipt: receipt,
      }
    })
    modal.onDidDismiss().then((d: any) => this.getMyReceipts(this.id));
    modal.present();
  }

  reload(d:any)
  {
    this.getMyReceipts(this.id);
  }

  sort(scelta)
  {
    this.sortOrder = scelta;
    let value = scelta;

    if(value == "dateOld")
    {
      this.receiptsList.sort(function(x:ReceiptDTO,y:ReceiptDTO) 
      {
        const dateX = new Date(x.date);
        const dateY = new Date(y.date);

        if (dateX > dateY)
        {
            return 1;
        }    
        if (dateX < dateY)
        {
            return -1;
        }
        return 0;
      });
    }
    else if(value == "dateNew")
    {
      this.receiptsList.sort(function(x:ReceiptDTO,y:ReceiptDTO) 
      {
        const dateX = new Date(x.date);
        const dateY = new Date(y.date);

        if (dateX < dateY)
        {
            return 1;
        }    
        if (dateX > dateY)
        {
            return -1;
        }
        return 0;
      });
    }
    else if(value == "priceL")
    {
      this.receiptsList.sort(function(x:ReceiptDTO,y:ReceiptDTO) 
      {
        if (x.total > y.total) 
        {
            return 1;
        }    
        if (x.total < y.total) 
        {
            return -1;
        }
        return 0;
      });
    }
    else if(value == "priceH")
    {
      this.receiptsList.sort(function(x:ReceiptDTO,y:ReceiptDTO) 
      {
        if (x.total < y.total) 
        {
            return 1;
        }    
        if (x.total > y.total) 
        {
            return -1;
        }
        return 0;
      });
    }
  }

  async filter()
  {
    const modal = await this.modalController.create
    ({
      component: FilterModalComponent
    })
    modal.onDidDismiss().then((d: any) => {this.getMyReceipts(this.id, d.data)});
    modal.present(); 
  }

  async presentAlert() 
  { 
    let selectedValue:string;

    const alert = await this.alertController.create({
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (data) => {
            selectedValue = data;
            console.log(selectedValue)
            this.sort(selectedValue)
          },
        },
      ],
      inputs: [
        {
          label: 'Newer',
          type: 'radio',
          value: 'dateNew',
          checked: this.sortOrder == "dateNew"
        },
        {
          label: 'Older',
          type: 'radio',
          value: 'dateOld',
          checked: this.sortOrder == "dateOld"
        },
        {
          label: 'Highest price',
          type: 'radio',
          value: 'priceH',
          checked: this.sortOrder == "priceH"
        },
        {
          label: 'Lowest price',
          type: 'radio',
          value: 'priceL',
          checked: this.sortOrder == "priceL"
        }
      ],
      
    });
    await alert.present();    

  }


}
