import { Component, OnInit } from '@angular/core';
import { CourseService } from './../../../Service/course.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements  OnInit{

 courses:any[]=[];
 selectCourseId:any;
 flag:boolean=false;
constructor(private courseService:CourseService) {
  }
courseForm=new  FormGroup({
  courseName:new  FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(100),Validators.pattern('^[a-zA-Z\u0600-\u06FF\s]+$')]),
  courseDesc : new  FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z\u0600-\u06FF\s]+$')]),
  courseduration:new  FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),
  courseCost:new  FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')])
  })
formHandler(e:any){
// e.preventDefault();
// if(this.courseForm.status=='VALID'){
//   this.addCourse()
// }
}
get getCourseName(){
  return  this.courseForm.controls['courseName']
}
get getCourseDesc(){
  return  this.courseForm.controls['courseDesc']
}
get getCourseDuration(){
  return  this.courseForm.controls['courseduration']
}
get getCourseCost(){
  return  this.courseForm.controls['courseCost']
}

loadCourses():void{
  this.courseService.getAllCourses().subscribe((result:any)=>{
    this.courses=result
    console.log(this.courses)
  })
}
  ngOnInit(): void {
    this.loadCourses();

  }

    deleteCourse(courseId:number){
    this.courseService.deleteCourse(courseId).subscribe(()=>{
      this.loadCourses();
  })
}


addCourse(){
  const course={
    courseId:this.selectCourseId,
    courseName:this.courseForm.value.courseName,
    courseDescription:this.courseForm.value.courseDesc,
    courseCost:this.courseForm.value.courseCost,
    courseDurationInHours:this.courseForm.value.courseduration
  }
  this.courseService.addCourse(course).subscribe(()=>{
    this.courseForm.reset()
    this.loadCourses()
  })
}
updateCourse(courseId:any){
  this.flag=true;
  this.selectCourseId=courseId
  this.courseService.getCourseById(courseId).subscribe((result:any)=>{
    console.log(result)
    this.courseForm.patchValue({
      courseName:result.courseName,
      courseDesc:result.courseDescription,
      courseCost:result.courseCost,
      courseduration:result.courseDurationInHours
    })
  })
}
savedata(){

  const course={
    courseId:this.selectCourseId,
    courseName:this.courseForm.value.courseName,
    courseDescription:this.courseForm.value.courseDesc,
    courseCost:this.courseForm.value.courseCost,
    courseDurationInHours:this.courseForm.value.courseduration
  }
  this.courseService.UpdateCourse(course).subscribe(()=>{
    this.courseForm.reset()
    this.flag=false;
    this.ngOnInit()

  })
}
back(){
  this.flag=false;
  this.courseForm.reset()
}

  }
