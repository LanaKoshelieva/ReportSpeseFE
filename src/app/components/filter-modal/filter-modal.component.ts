import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { FilterDTO } from 'src/app/model/DTO/filter-dto';


@Component({
  selector: 'app-deposit-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit 
{

  userId:number = +localStorage.getItem("userId")
  newReceiptForm:FormGroup;

  loading = false;

  formattedDateTo;
  formattedDateFrom;
  
  showPickerFrom = false;
  showPickerTo = false;

  constructor(private modalController: ModalController,
              private formBuilder: FormBuilder,
    ) 
    {}

  ngOnInit() 
  {
    this.newReceiptForm = this.formBuilder.group
    ({
        category: [null],
        seller: [null],
        paymentType: [null],
        dateFrom: [null],
        dateTo: [null],
        totalMax: [null],
        totalMin: [null],
        products: [null],
    })

  }


  dateChangedFrom(value)
  {
    console.log(value)
    this.formattedDateFrom = format(parseISO(value), 'yyyy-MM-dd'),
    console.log(this.formattedDateFrom)
    this.showPickerFrom = false;
  }
  
  dateChangedTo(value)
  {
    console.log(value)
    this.formattedDateTo = format(parseISO(value), 'yyyy-MM-dd'),
    console.log(this.formattedDateTo)
    this.showPickerTo = false;
  }

  reset()
  {
    this.newReceiptForm.reset();
  }

  search()
  {
    
    this.loading = true;
    let filter = new FilterDTO;

    filter.userId = this.userId;
    if(this.newReceiptForm.value.totalMax !== null)
    {
      filter.priceMax = +this.newReceiptForm.value.totalMax;
    }
    if(this.newReceiptForm.value.totalMin !== null)
    {
      filter.priceMin = +this.newReceiptForm.value.totalMin;
    }
      
    filter.category = this.newReceiptForm.value.category;
    filter.seller = this.newReceiptForm.value.seller;
    filter.dateFrom = this.newReceiptForm.value.dateFrom;
    filter.dateTo = this.newReceiptForm.value.dateTo;
    filter.paymentType = this.newReceiptForm.value.paymentType;
    filter.product = this.newReceiptForm.value.product;

    this.modalController.dismiss(filter, 'confirm')
  }




}
