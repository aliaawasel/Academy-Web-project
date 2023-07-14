import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
    baseURL:string='https://localhost:7044/academy-api/group';
    constructor(private http:HttpClient) { }

    getAllGroupsAuth(){
      return this.http.get(`${this.baseURL}/all`);
    }
    add(data:any){
      return this.http.post(`${this.baseURL}/insert`,data);
    }
    Delete(id:number){
      return this.http.delete(`${this.baseURL}/delete/${id}`)
    }
    Update(data:any){
      return this.http.put(`${this.baseURL}/update`,data)
    }
    GetGroupByID(id:number){
      return this.http.get(`${this.baseURL}/${id}`)
    }
}

