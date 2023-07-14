import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  baseURL:string='https://localhost:7044/academy-api/subject/all/'
  editURL: string = 'https://localhost:7044/academy-api/subject/update';
  insertUrl:string='https://localhost:7044/academy-api/subject/insert';
  udate:string='https://localhost:7044/academy-api/subject/update'
  getById:string='https://localhost:7044/academy-api/subject/'
  deleteUrl:string='https://localhost:7044/academy-api/subject/delete/'


  constructor(private http: HttpClient) {}

  getAllSubjectsByCI(courceId:any) {
    return this.http.get(`${this.baseURL}${courceId}`);
  }

  getSubjectById(subjectId: any) {
    return this.http.get(`${this.getById}${subjectId}`);
  }
  getSubjectCourse(courseId:any){
    return this.http.get(`${this.baseURL}${courseId}`);
  }

  addSubject(subject: any) {
    return this.http.post(this.insertUrl,subject)
  }

  deleteSubject(subjectId: any) {
    return this.http.delete(`${this.deleteUrl}${subjectId}`);
  }

  editSubject(subject: any) {
    return this.http.post(this.editURL, subject);
  }

}
