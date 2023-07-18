import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {
  baseUrl:string="https://localhost:7044/academy-api/Trainee"
  branchUrl:string="https://localhost:7044/academy-api/branch"
  courseUrl:string="https://localhost:7044/academy-api/course"
  stdudentbybranchUrl:string="https://localhost:7044/academy-api/trainee/all-by-branch-id"
  studentsUrl:string="https://localhost:7044/academy-api/trainee"
  stdudentCoursUrl:string="https://localhost:7044/academy-api/trainee-course-relation"



  constructor(private http:HttpClient) { }

  getBrnachs(){
    return this.http.get(`${this.branchUrl}/all`)
  }
  getCourses(){
    return this.http.get(`${this.courseUrl}/all`)
  }
  getStudentsbyBranch(branchId:number){
    return this.http.get(`${this.stdudentbybranchUrl}/${branchId}`)
  }
  getStudentByid(traineeId:number){
    return this.http.get(`${this.baseUrl}/${traineeId}`)
  }
  getStudentdCourse(traineeId:number){
    return this.http.get(`${this.stdudentCoursUrl}/all/${traineeId}`)
  }
  deleteCourse(data:any){
    return this.http.put(`${this.stdudentCoursUrl}/delete`,data)
  }
  addStudentCourse(data:any){
    return this.http.post(`${this.stdudentCoursUrl}/insert`,data)
  }


}
