import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { FilterDTO } from 'src/app/model/DTO/filter-dto';
import { ReceiptDTO } from 'src/app/model/DTO/receipt-dto';
import { ResponseDTO } from 'src/app/model/DTO/response-dto';
import { UserDTO } from 'src/app/model/DTO/user-dto';
import { AlertService } from 'src/app/services/alert.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SearchService } from 'src/app/services/search.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  subscription: any;

  id: number = +localStorage.getItem('userId');
  userName:string = "";
  difference:number = 0;
  lastMonth:number = 0;

  currentSum: number = null;
  lastMonthSum: number = null;

  constructor(private receiptsService: SearchService,
              private profileService: ProfileService,
              private alertService: AlertService,
              private alertController: AlertController,
              )
  {}

  ionViewWillEnter()
  {
    this.getUser();
    this.getReceipts();
  }

  ngOnInit() 
  {}

  getReceipts()
  {
    let currentDay = new Date();
    let filter = new FilterDTO;
    filter.userId = this.id;
    currentDay.setMonth(currentDay.getMonth() -1)
    currentDay.setDate(1)
    filter.dateFrom = format(currentDay, 'yyyy-MM-dd');    
    this.receiptsService.myReceipts(filter).subscribe(
      (response) => {
        console.log(response);
        const r: ResponseDTO = response as ResponseDTO;
        if (r.code == 200) {
          const receipt: ReceiptDTO[] = r.data as ReceiptDTO[];
          this.getSomme(receipt);

        } else {
          this.alertService.showAlert(
            'Ooops',
            'Something went wrong',
            r.message,
            this.alertController
          );
        }
      },
      (error) => {
        console.log(error)
        this.alertService.showAlert(
          'Ooops',
          'Something went wrong',
          error.error.message,
          this.alertController
        );
      }
    );
  }

  getUser()
  { 
    this.profileService.getProfile(this.id).subscribe(
      (response) => {
        const r: ResponseDTO = response as ResponseDTO;
        if (r.code == 200) {
          const user: UserDTO = r.data as UserDTO;
          this.userName = user.name;

        } else {
          this.alertService.showAlert(
            'Ooops',
            'Something went wrong',
            r.message,
            this.alertController
          );
        }
      },
      (error) => {
        this.alertService.showAlert(
          'Ooops',
          'Something went wrong',
          error.error.message,
          this.alertController
        );
      }
    );
  }

  getSomme(receipts: ReceiptDTO[])
  {
    console.log(receipts)
    let currentDay = new Date();
    console.log(currentDay);
    this.lastMonthSum = 0;
    this.currentSum = 0;
    for (let r of receipts) 
    {
      const date = new Date(r.date);
      console.log(date.getMonth())
      console.log(currentDay.getMonth())


      if(date.getMonth() == currentDay.getMonth())
      {
        this.currentSum += r.total;
      }
      if(date.getMonth() == currentDay.getMonth()-1)
      {
        this.lastMonthSum += r.total;
      }   
    }
    let x = this.currentSum - this.lastMonthSum;    
    this.difference = x;
    this.lastMonth = this.lastMonthSum;

  }




}
