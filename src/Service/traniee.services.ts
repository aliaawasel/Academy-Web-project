import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class tranieeServices {

    traineeUrl:string='https://localhost:7044/academy-api/trainee/all'
    constructor(private http:HttpClient) { }

    GetTranieeAll(){
        return this.http.get(this.traineeUrl);
    }
}