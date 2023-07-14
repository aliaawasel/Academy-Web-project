import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl:string="https://localhost:7044/academy-api/transaction/"

  constructor(private http:HttpClient) { }
  GetAllTransction(id:number){
    return this.http.get(`${this.baseUrl}all/${id}`)
  }
  GetCoursesAccountsStatements(id:number){
    return this.http.get(`${this.baseUrl}courses-accounts-statements/${id}`)
  }
  AddTransction(data:any){
    return this.http.post(`${this.baseUrl}insert`,data)
  }

  DeleteTransction(id:number){
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }
}
