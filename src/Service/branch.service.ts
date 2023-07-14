import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  baseUrl:string="https://localhost:7044/academy-api/branch"
  namUrl:string="https://localhost:7044/academy-api/user/all-users-full-names"

  constructor(private http:HttpClient) { }
  GetAllBranch(){
    return this.http.get(`${this.baseUrl}/all`)
  }
  GetBranchByID(id:number){
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  AddBranch(data:any){
    return this.http.post(`${this.baseUrl}/insert`,data)
  }
  UpdateBranch(data:any){
    return this.http.post(`${this.baseUrl}/update`,data)
  }
  DeleteBranch(id:number){
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }
  getusername(){
    return this.http.get(`${this.namUrl}`)
  }
}
