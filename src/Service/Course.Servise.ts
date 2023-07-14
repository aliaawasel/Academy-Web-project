import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseURL: string = 'https://localhost:7044/academy-api/course/all';
  grtbyid:string='https://localhost:7044/academy-api/course/all-trainee-courses/'
  constructor(private http: HttpClient) {}

  getAllCourses() {
    return this.http.get(this.baseURL);
  }

  getcoursesById(id:number){
    return this.http.get(`${this.grtbyid}${id}`);
  }


 
}
