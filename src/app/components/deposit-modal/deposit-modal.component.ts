import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ReceiptDTO } from 'src/app/model/DTO/receipt-dto';
import { ResponseDTO } from 'src/app/model/DTO/response-dto';
import { AlertService } from 'src/app/services/alert.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.scss'],
})
export class DepositModalComponent implements OnInit 
{

  userId:number = +localStorage.getItem("userId")
  newReceiptForm:FormGroup;
  receipt:ReceiptDTO = null;
  canDelete: boolean = false;

  buttonText:string = "Add receipt";

  loading = false;

  formattedDate;
  showPicker = false;
  dateValue = format(new Date(), 'dd-MM-yyyy')  + 'T09:00:00.000Z'; 

  constructor(private modalController: ModalController,
              private formBuilder: FormBuilder,
              private searchService: SearchService,
              private alertController: AlertController,
              private alertService: AlertService,

    ) 
    {}

  ngOnInit() 
  {
    this.newReceiptForm = this.formBuilder.group
    ({
        category: ['', Validators.required],
        seller: ['', Validators.required],
        paymentType: ['', Validators.required],
        date: ['', Validators.required],
        total: ['', Validators.required],
        products: [''],
    })

    if (this.receipt !== null)
    {
      this.newReceiptForm.patchValue({category:this.receipt.category})
      this.newReceiptForm.patchValue({seller:this.receipt.seller})
      this.newReceiptForm.patchValue({total:this.receipt.total})
      this.newReceiptForm.patchValue({paymentType:this.receipt.paymentType})
      this.newReceiptForm.patchValue({date:this.receipt.date})
      this.newReceiptForm.patchValue({products:this.receipt.product})
      this.canDelete = true;
      this.buttonText = "Edit receipt";

    }
  }


  dateChanged(value)
  {
    this.dateValue = value;
    console.log(value)
    this.formattedDate = format(parseISO(value), 'yyyy-MM-dd'),
    console.log(this.formattedDate)
    this.showPicker = false;
  }  

  addReceipt()
  {
    this.loading = true;
    if (this.receipt == null)
    {
      this.receipt = new ReceiptDTO;
      this.receipt.userId = this.userId;
    }    
    this.receipt.category = this.newReceiptForm.value.category;
    this.receipt.seller = this.newReceiptForm.value.seller;
    this.receipt.total = +this.newReceiptForm.value.total;
    this.receipt.date = this.newReceiptForm.value.date;
    this.receipt.paymentType = this.newReceiptForm.value.paymentType;
    this.receipt.product = this.newReceiptForm.value.products;

    this.searchService.updateCreateReceipt(this.receipt).subscribe
    (response =>
      {
        this.loading = false;        
        const r:ResponseDTO = response as ResponseDTO;
            if(r.code == 200)
            {
              this.alertService.showAlert("Ok", "Receipt saved", "Keep browsing", this.alertController)
              this.modalController.dismiss();
              // this.router.navigate(['search']);       
            }
            else
            {
              this.alertService.showAlert('Ooops', 'Houston we have a problem', r.message , this.alertController);
        
            }
          }, 
          error =>
          {
            console.log(error)
            this.loading = false
            this.alertService.showAlert('Ooops', 'Houston we have a problem', error.error.message , this.alertController);
          }       
    )
   
  }

  deleteReceipt()
  {
    this.loading = true;
    this.searchService.deleteReceipt(this.receipt.code).subscribe
    (response =>
      {
        this.loading = false;

        const r:ResponseDTO = response as ResponseDTO;
            if(r.code == 200)
            {
              this.alertService.showAlert("Ok", "Receipt deleted", "Keep browsing", this.alertController)
              this.modalController.dismiss();
              // this.router.navigate(['search']);       
            }
            else
            {
              this.alertService.showAlert('Ooops', 'Houston we have a problem', r.message , this.alertController);
        
            }
          }, 
          error =>
          {
            console.log(error)
            this.loading = false
            this.alertService.showAlert('Ooops', 'Houston we have a problem', error.error.message , this.alertController);
          }       
    )
   
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }


}
