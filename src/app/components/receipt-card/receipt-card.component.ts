import { Component, Input, OnInit } from '@angular/core';
import { ReceiptDTO } from 'src/app/model/DTO/receipt-dto';

@Component({
  selector: 'app-receipt-card',
  templateUrl: './receipt-card.component.html',
  styleUrls: ['./receipt-card.component.scss'],
})
export class ReceiptCardComponent implements OnInit {

  @Input() receipt:ReceiptDTO;

  code: number;
  category: string = "";
  seller: string = "";
  total: string = null;
  paymentType: string = "";
  date: string = "";
  products: string = "";

  constructor() { }

  ngOnInit() 
  {
    this.code = this.receipt.code;
    this.category = this.receipt.category;
    this.seller = this.receipt.seller;
    this.total = this.receipt.total.toFixed(2) ;
    this.date = this.receipt.date;
    this.paymentType = this.receipt.paymentType;
    this.products = this.receipt.products;
  }

  productsText()
  {
    if(this.products)
    {
      if(this.products.length > 0)
      {
        if(this.products.length > 30)
        {
          return this.products.substring(0, 30) + " ...";
        }
        else return this.products;
      }
    }
    return "No products inserted"
  }

  categoryText()
  {
    if(this.category)
    {
      if(this.category.length > 0)
      {
        if(this.category.length > 30)
        {
          return this.category.substring(0, 30) + " ...";
        }
        else return this.category;
      }
    }
    return "No category inserted"
  }


}
