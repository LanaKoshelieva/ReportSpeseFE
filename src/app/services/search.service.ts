import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterDTO } from '../model/DTO/filter-dto';
import { ReceiptDTO } from '../model/DTO/receipt-dto';
import { requestOptions } from './header';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) 
  { }

  updateCreateReceipt(receipt:ReceiptDTO)
  {
    if(receipt.code == null)
    {
      return this.createReceipt(receipt)
    }
    else
    {
      return this.updateReceipt(receipt)
    }
  }

  createReceipt(receipt: ReceiptDTO)
  {
    return this.http.post("http://localhost:8080/my_expenses_manager/api/receipt/create", receipt, requestOptions())
  }

  getReceipt(id:number)
  {
    return this.http.get("http://localhost:8080/my_expenses_manager/api/receipt/" + id, requestOptions())
  }

  myReceipts(filter:FilterDTO)
  {
    return this.http.post("http://localhost:8080/my_expenses_manager/api/archive/filtered", filter, requestOptions())
  }

  deleteReceipt(id:number)
  {
    return this.http.delete("http://localhost:8080/my_expenses_manager/api/receipt/delete/" + id, requestOptions() )
  }

  updateReceipt(receipt:ReceiptDTO)
  {
    return this.http.put("http://localhost:8080/my_expenses_manager/api/receipt/update", receipt, requestOptions())
  }
}
