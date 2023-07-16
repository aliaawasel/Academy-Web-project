import { FormControl, FormGroup } from '@angular/forms';
import { Component,OnInit} from '@angular/core';
import { SubjectService } from 'src/Service/Subject.Servise';
import { CourseService } from 'src/Service/course.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements  OnInit {
  Allcourses:any
  subjctByCrsId:any []=[]
  isEdit:boolean=false;
  selectedCourseID!:number;
  selectedSubjectID!:Number;
  courceId:any
  courseId:any
  subjectId:any


  // courseId:any
  constructor(
    private subjectService:SubjectService,
    private courseService:CourseService
    ){}

    subjectForm =new FormGroup({
    subjectName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z\u0600-\u06FF]+$')]),
    subjectCourse: new FormControl('',[Validators.required]),
  })

  get getSubjectName(){
    return this.subjectForm.controls['subjectName']
  };
  get getSubjectCourse(){
    return this.subjectForm.controls['subjectCourse']
  };

  formHandler(e:any){

  }



loadSubjects() {
  this.courseId = this.subjectForm.value.subjectCourse;
 console.log("loading");

 this.subjectService.getAllSubjectsByCI(this.courseId).subscribe({
   next: (response: any) => {
     this.subjctByCrsId = response;
     console.log(response);
   },
   error: (error) => {
     console.log(error);
   }
 });
}

    ngOnInit(): void {

    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        this.Allcourses = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });

// this.loadSubjects()
console.log("on it fn");


}

DeleteSubject(id:number){
  console.log(id)
    this.subjectService.deleteSubject(id).subscribe(()=>{
      this.loadSubjects();
  })
  }
  EditSubject(id:number){
    this.subjectId=id
    this.subjectService.getSubjectById(id).subscribe((result:any)=>{
      console.log(result)
      this.isEdit=true;
      console.log(this.isEdit);

      const subject=result
      this.subjectForm.patchValue({
        subjectName:subject.subjectName,
        subjectCourse:subject.courseId,

      })
    })
  }
  saveUpdate(){
    const subject={
      subjectId:this.subjectId,
      subjectName:this.subjectForm.value.subjectName,
      courseId:this.subjectForm.value.subjectCourse,
    }
    console.log(subject);

    this.subjectService.editSubject(subject).subscribe(()=>{
      console.log("edited")
      this.loadSubjects();
      this.isEdit=false;
      this.courceId=0;
      this.subjectForm.reset();

  })
  }
  AddSubject(){
    const subject={
      subjectName:this.subjectForm.value.subjectName,
      courseId:this.subjectForm.value.subjectCourse,
    }
    console.log(subject)
    this.subjectService.addSubject(subject).subscribe(()=>{
      console.log("added");
      this.loadSubjects();
      this.subjectForm.reset();

    })
  }
  back(){
    this.subjectForm.reset();
  }

}

