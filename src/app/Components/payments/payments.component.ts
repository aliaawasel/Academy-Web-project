import { Component } from '@angular/core';
import { PaymentService } from 'src/Service/Payment.Service';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { BranchService } from 'src/Service/branch.service';
import { CourseService } from 'src/Service/Course.Servise';
import { tranieeServices } from 'src/Service/traniee.services';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  branchs:any []=[]
  courses:any
  traniees:any
  traineeId:any
  tarineeTrainsactionData:any
  isEdit:boolean=false;
  courseName:any

  selectedCourseID!:number;
  selectedSubjectID!:Number;
  courceId:any
  courseId:any


  // courseId:any
  constructor(
    private paymentService:PaymentService,
    private branchService:BranchService,
    private tranieeServices:tranieeServices,
    private coursesService:CourseService,
    ){}

    trainsacteForm =new FormGroup({
      branchSelect: new FormControl('',[Validators.required]),
      studentNameSelected: new FormControl('',[Validators.required]),
      courseSelect: new FormControl('',[Validators.required]),
      Remainingamount: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),
      Theamountpaid: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),

  })

  get getbranchSelect(){
    return this.trainsacteForm.controls['branchSelect']
  };
  get getstudentNameSelected(){
    return this.trainsacteForm.controls['studentNameSelected']
  };
  get getcourseSelect(){
    return this.trainsacteForm.controls['courseSelect']
  };  
  get getRemainingamount(){
    return this.trainsacteForm.controls['Remainingamount']
  };  get getTheamountpaid(){
    return this.trainsacteForm.controls['Theamountpaid']
  };

  formHandler(e:any){

  }
  



   ngOnInit(): void {

  

      this.branchService.GetAllBranch().subscribe({
        next: (response: any) => {
          this.branchs = response; 
          console.log(response);     
        },
        error: (error) => {
          console.log(error);
        }
      });

     this.tranieeServices.GetTranieeAll().subscribe({
       next:(response :any)=>{
         this.traniees=response
         console.log(response);     
       },
       error:()=>{},
     })
     this.coursesService.getAllCourses().subscribe({
      next:(response :any)=>{
        this.courses=response
        console.log(response);     
      },
      error:()=>{},
    })
     
    
    
      
      }
 

      getTraineeId(){
        this.traineeId=this.trainsacteForm.value.studentNameSelected
        console.log(this.traineeId);
      //   this.paymentService.GetCoursesAccountsStatements(this.traineeId).subscribe({
      //    next: (response: any) => {
      //      this.courses = response; 
      //      console.log(response);     
      //    },
      //    error: (error) => {
      //      console.log(error);
      //    }
      //  });
    
       this.paymentService.GetAllTransction(this.traineeId).subscribe({
        next: (response: any) => {
          this.tarineeTrainsactionData = response; 
          console.log( this.tarineeTrainsactionData);     
        },
        error: (error) => {
          console.log(error);
        }
       })
  
       


    
  }
  getCourseId(){
    this.courceId=this.trainsacteForm.value.courseSelect;
    console.log(this.courceId);
    
    this.coursesService.getcoursesById(this.courceId).subscribe((response:any)=>{
      this.courseName=response[0].courseName;
      console.log(response);
      
    })
   }

  addTrainsaction(){
    const today = new Date();
    const day = today.getDate();
const month = today.getMonth() + 1; 
const year = today.getFullYear();
    
        const trainsaction={
      courseName:this.courseName,
      transactionDateTime:day+month+year,
      receivedMoneyAmount:this.trainsacteForm.value.Theamountpaid,
      dashboardUser:"sara",
      notes:"لا يوجد",
      traineeId:this.traineeId,
      courseId: this.courceId,
    }
    console.log(trainsaction);
    this.paymentService.AddTransction(trainsaction).subscribe(()=>{
      console.log("added");
      // this.loadSubjects();
      this.trainsacteForm.reset();

    })
  
  }  
}