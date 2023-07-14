import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = 'https://localhost:7044/academy-api/user/all';
  idUrl:string='https://localhost:7044/academy-api/user/';
  delUser: string='https://localhost:7044/academy-api/user/delete/';
  updateUrl:string='https://localhost:7044/academy-api/user/update'
  postUrl:string ='https://localhost:7044/academy-api/user/insert';
  branchUrl: string='https://localhost:7044/academy-api/branch/all';
  LanguageUrl: string='https://localhost:7044/academy-api/language/all';
  groupUrl: string='https://localhost:7044/academy-api/group/all';


  constructor(private http: HttpClient) {}
   
  getAllUsers() {
    console.log("ssssss");
    console.log(this.baseURL);
    
    return this.http.get(this.baseURL);
    
    
  }
   
  getBranch(){
   return this.http.get(this.branchUrl);
  }

  getGroup(){
  return this.http.get(this.groupUrl);
  }
 
  getLanguage(){
  return this.http.get(this.LanguageUrl);
  }

  getUserById(userId: any) {
    return this.http.get(`${this.idUrl}${userId}`);
  }

  addUser(user: any) {
    return this.http.post(`${this.postUrl}`,user);
  }

  deleteUser(userId: any) {
    return this.http.delete(`${this.delUser}${userId}`);
  }

  editUser( user: any) {
    return this.http.put(`${this.updateUrl}`, user);
  }
  
}