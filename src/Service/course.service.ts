import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
baseUrl:string="https://localhost:7044/academy-api/course"

  constructor(private http:HttpClient) { }
  getAllCourses(){
    return  this.http.get(`${this.baseUrl}/all`)
  }
  getCourseById(courseId:number){
    return  this.http.get(`${this.baseUrl}/${courseId}`)
  }
  deleteCourse(courseId:number){
      return  this.http.delete(`${this.baseUrl}/delete/${courseId}`)
    }
    addCourse(data:any){
      return  this.http.post(`${this.baseUrl}/insert`,data)

    }
    getcoursesByTraineeId(id:any){
      return  this.http.get(`${this.baseUrl}/all-trainee-courses/${id}`)
    }
    UpdateCourse(data:any ){
      return  this.http.post(`${this.baseUrl}/update`,data)

    }
}
