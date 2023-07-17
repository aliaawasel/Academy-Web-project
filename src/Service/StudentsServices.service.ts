import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentsServices {
  baseUrl:string='https://localhost:7044/academy-api/trainee/all';
  idUrl:string='https://localhost:7044/academy-api/trainee/';
  addUrl:string='https://localhost:7044/academy-api/trainee/insert';
  updateUrl:string='https://localhost:7044/academy-api/trainee/update';
  religionUrl:string='https://localhost:7044/academy-api/trainee/religion-combobox-values';
  genderUrl:string='https://localhost:7044/academy-api/trainee/gender-combobox-values';
  statusUrl:string='https://localhost:7044/academy-api/trainee/military-status-combobox-values';
  yearsUrl:string='https://localhost:7044/academy-api/trainee/years-from-1980-till-now';
  deleteUrl:string='https://localhost:7044/academy-api/trainee/delete/';
  branchUrl: string='https://localhost:7044/academy-api/branch/all';
 deactiveUrl:string='https://localhost:7044/academy-api/trainee/deactivate/';
 studentbyBranch:string=' https://localhost:7044/academy-api/trainee/all-by-branch-id'


  constructor(private http: HttpClient) {}

 GetAllStudents(){
  return this.http.get(this.baseUrl);
 }
 GetAllBranches(){
  return this.http.get(this.branchUrl);
 }
 getStudentById(studentId: any) {
  return this.http.get(`${this.idUrl}${studentId}`);
}
getStudentByBranch(branchId:any){
  return this.http.get(`${this.studentbyBranch}/${branchId}`)
}
 addStudent(student:any){
return this.http.post(`${this.addUrl}`,student);
 }
 UpdateStudent(Student:any){
  return this.http.put(`${this.updateUrl}`,Student)
 }
 deleteStudent(StudentId:any){
 return this.http.delete(`${this.deleteUrl}${StudentId}`)
 }
 deactivStudent(StudentId:any){
  return this.http.head(`${this.deactiveUrl}${StudentId}`)
  }
 GetAllStatus(){
  return this.http.get(this.statusUrl);
 }
 GetAllGender(){
  return this.http.get(this.genderUrl);
 }
 GetAllyears(){
  return this.http.get(this.yearsUrl);
 }
 GetAllReligion(){
  return this.http.get(this.religionUrl);
 }
}
