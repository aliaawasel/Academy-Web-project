import { StudentCourseService } from './../../../Service/student-course.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit{
/**
 *
 */
constructor(private studentCourseService:StudentCourseService) {

}
branchid:any
studentCourseForm=new FormGroup({
  branchName:new  FormControl('',[Validators.required]),
  studentName:new FormControl('',[Validators.required]),
  courseName:new FormControl('',[Validators.required]),
  dateOfCourse:new FormControl('',[Validators.required])
})
formHandler(e:any){
  //e.preventDefault();
  // // if(this.courseForm.status=='VALID'){
  // //   this.addCourse()
  // // }
   }
get getBranchName(){
   return  this.studentCourseForm.controls['branchName']
 }
 get getStudentName(){
  return  this.studentCourseForm.controls['studentName']
}
get getcourseName(){
  return  this.studentCourseForm.controls['courseName']
}
get getdateOfCoursee(){
  return  this.studentCourseForm.controls['dateOfCourse']
}

  ngOnInit(): void {
    this.getbranches();
    this.getcourses();
    this.getStudentName.disable();
  }
  branches:any
  students:any
  courses:any
  StdCrs:any[]=[]
  studentOfId:any


  getbranches(){
    this.studentCourseService.getBrnachs().subscribe((res:any)=>{
      this.branches=res
  })}
  getstudents(){
    const branchid=Number(this.studentCourseForm.value.branchName)
    this.studentCourseService.getStudentsbyBranch(branchid).subscribe((res:any)=>{
      this.students=res
      this.getStudentName.enable();
      //console.log(this.students);
  })}
  getStudentById(){
    const studentId=Number(this.studentCourseForm.value.studentName)
    this.studentCourseService.getStudentByid(studentId).subscribe((res:any)=>{
      this.studentOfId=res
      console.log("done 1");
    })
  }
  getcourses(){
    this.studentCourseService.getCourses().subscribe((res:any)=>{
      this.courses=res
      ;

    })
  }
  getStudentdCourse(){
    const studentId=Number(this.studentCourseForm.value.studentName)
    this.studentCourseService.getStudentdCourse(studentId).subscribe((res:any)=>{
      this.StdCrs=res
      console.log("done 2");
      console.log(this.StdCrs)
    })
  }

addStudentCourse(){
  const stdCrs={
  traineeId:this.studentCourseForm.value.studentName,
  courseId:this.studentCourseForm.value.courseName,
  registrationDate:this.studentCourseForm.value.dateOfCourse
}
  this.studentCourseService.addStudentCourse(stdCrs).subscribe(()=>{
    console.log("done")
    this.ngOnInit();
  })
  this.studentCourseForm.reset();
}
deleteCourseStudent(id:number,Date:any){
  const stdCrs={
    traineeId:this.studentCourseForm.value.studentName,
    courseId:id,
    registrationDate:Date
  }
  this.studentCourseService.deleteCourse(stdCrs).subscribe(()=>{
    this.getStudentdCourse();
    this.ngOnInit();
  })

}
back(){
  this.studentCourseForm.reset();
}
}
