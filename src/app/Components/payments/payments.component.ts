import { Component } from '@angular/core';
import { PaymentService } from 'src/Service/Payment.Service';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { BranchService } from 'src/Service/branch.service';
import { CourseService } from 'src/Service/course.service';
import { StudentsServices } from 'src/Service/StudentsServices.service'; 
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  branchs:any []=[]
  traineeCourses:any
  tranieesBybranch:any
  branchId:any
  traineeId:any
  selectedCourseIndex:any;
  courceId:any
  courseName:any
  tarineeTrainsactionData:any
  AllTransactions:any
  transactionId:any
  showTable = false;
  tokenData:any
token:any;

  constructor(
    private paymentService:PaymentService,
    private branchService:BranchService,
    private studentsServices:StudentsServices,
    private coursesService:CourseService,
    ){}

    trainsacteForm =new FormGroup({
      branchSelect: new FormControl('',[Validators.required]),
      studentNameSelected: new FormControl('',[Validators.required]),
      courseSelect: new FormControl('',[Validators.required]),
      Theamountpaid: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),
      notes: new FormControl(''),

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
  get getTheamountpaid(){
    return this.trainsacteForm.controls['Theamountpaid']
  }; 
  get getnotes(){
    return this.trainsacteForm.controls['notes']
  }; 

  formHandler(e:any){}

  loadTransactions():void{
    this.getCoursesAccountStatements();
    this.getAllTransactions();

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
      }


      GetTranieeByBranchIdAll(){
        console.log("traineeid");
        
        this.branchId=this.trainsacteForm.value.branchSelect
        this.studentsServices.getStudentByBranch(this.branchId).subscribe({
          next:(response :any)=>{
            this.tranieesBybranch=response
            console.log(response);     
          },
          error:()=>{},
        })
      }  

      GetTranieeCourses(){
        this.traineeId=this.trainsacteForm.value.studentNameSelected
        this.coursesService.getcoursesByTraineeId(this.traineeId).subscribe({
          next:(response :any)=>{
            this.traineeCourses=response
            console.log(response);     
          },
          error:()=>{},
        })
        this.getCoursesAccountStatements();
        this.getAllTransactions();
      }

 
      getCoursesAccountStatements(){
        this.paymentService.GetCoursesAccountsStatements(this.traineeId).subscribe({
          next:(response :any)=>{
            this.tarineeTrainsactionData=response
            console.log(response);     
          },
          error:()=>{},
        })
        this.showTable =true;

        }

        getAllTransactions(){
          this.paymentService.GetAllTransction(this.traineeId).subscribe({
            next:(response :any)=>{
              this.AllTransactions=response
              console.log(response);     
            },
            error:()=>{},

          })
          
        }
        addTrainsaction(){
          this.token=localStorage.getItem("token");
          this.tokenData= jwt_decode(this.token);
          console.log(this.tokenData);
          

          this.selectedCourseIndex=this.trainsacteForm.value.courseSelect;
      
          const trainsaction={
                  courseName:this.traineeCourses[this.selectedCourseIndex].courseName,
                  transactionDateTime:new Date().toISOString(),
                  receivedMoneyAmount:Number(this.trainsacteForm.value.Theamountpaid),
                  dashboardUser:this.tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                  notes:this.trainsacteForm.value.notes,
                  traineeId:Number(this.traineeId),
                  courseId: this.traineeCourses[this.selectedCourseIndex].courseId
                }
                console.log(trainsaction);
                    this.paymentService.AddTransction(trainsaction).subscribe(()=>{
                      console.log("added");
                      this.loadTransactions();
                      this.trainsacteForm.reset();
                
                    })
        
        }
        
  
        back(){
          this.trainsacteForm.reset();
          this.showTable=false;
        }
        Delete(id:number){
          this.transactionId=id;
          this.paymentService.DeleteTransction(this.transactionId).subscribe(()=>{
          this.loadTransactions();
        })
        }

}
 
