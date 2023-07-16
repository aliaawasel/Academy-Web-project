import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { StudentsServices } from 'src/Service/StudentsServices.service';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class studentsComponent  {

  StusForm= new FormGroup({
    Username : new FormControl("",[Validators.required,Validators.minLength(3)]),
    userNameE:new FormControl("",[Validators.required,Validators.minLength(3)]),
    nationalNumber:new FormControl("",[Validators.required,Validators.minLength(14),Validators.maxLength(14),Validators.pattern('^[0-9]+$')]),
    //email:new FormControl("",[Validators.required,Validators.pattern('email')]),
    religion:new FormControl("",[Validators.required]),
    type:new FormControl("",[Validators.required]),
    DOB:new FormControl("",[Validators.required]),
    address:new FormControl("",[Validators.required,Validators.minLength(3)]),
    LinePhone:new FormControl("",[Validators.required,Validators.maxLength(10),Validators.minLength(1),Validators.pattern('^[0-9]+$')]),
    phoneNumber1:new FormControl("",[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('^(010|011|012)[0-9]{8}$')]),
    phoneNumber2:new FormControl("",[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('^(010|011|012)[0-9]{8}$')]),
    recommand:new FormControl("",[Validators.required,Validators.minLength(3)]),
    Quali:new FormControl("",[Validators.required,Validators.minLength(3)]),
    year:new FormControl("",[Validators.required]),
    YearStudy:new FormControl("",[Validators.required]),
    status:new FormControl("",[Validators.required]),
    // personalImage:new FormControl("",[Validators.required]),
    // nationalImage:new FormControl("",[Validators.required]),
    // QulifImage:new FormControl("",[Validators.required]),
    branch:new FormControl("",[Validators.required]),
  })
  get getUserName(){
    return this.StusForm.controls['Username']
  };
  get getuserNameE(){
    return this.StusForm.controls['userNameE']
  };
  get getnationalNumber(){
    return this.StusForm.controls['nationalNumber']
  };
  // get getemail(){
  //   return this.StusForm.controls['email']
  // };
  get getreligion(){
    return this.StusForm.controls['religion']
  };
  get gettype(){
    return this.StusForm.controls['type']
  };
  get getDOB(){
    return this.StusForm.controls['DOB']
  };
  get getaddress(){
    return this.StusForm.controls['address']
  };
  get getLinePhone(){
    return this.StusForm.controls['LinePhone']
  };
  get getphoneNumber1(){
    return this.StusForm.controls['phoneNumber1']
  };
  get getphoneNumber2(){
    return this.StusForm.controls['phoneNumber2']
  };
  get getRecommend(){
    return  this.StusForm.controls['recommand']
  }
  get getQuality(){
    return  this.StusForm.controls['Quali']
  }
  get getyear(){
    return  this.StusForm.controls['year']
  }
  get getYearStudy(){
    return  this.StusForm.controls['YearStudy']
  }
  get getstatus(){
    return  this.StusForm.controls['status']
  }
  // get getpersonalImage(){
  //   return  this.StusForm.controls['personalImage']
  // }
  // get getnationalImage(){
  //   return  this.StusForm.controls['nationalImage']
  // }
  // get getQulifImage(){
  //   return  this.StusForm.controls['QulifImage']
  // }
  get getbranch(){
    return  this.StusForm.controls['branch']
  }

  formHandler(e:any){

  }
  constructor(
    private StudentServices:StudentsServices,

    ){}
    /** variabels */
  students:any=[];
  Branches:any
  SelectedId:any
  religions:any
  Status:any
  gender:any
  year:any
  flag:Boolean=false;
/** */
  ngOnInit(): void {
    /**get all student */
this.StudentServices.GetAllStudents().subscribe({
  next:(res:any)=>{
    this.students=res;
   // console.log(this.students);
  }
});
/**get all branches */
this.StudentServices.GetAllBranches().subscribe({
  next:(res:any)=>{
    this.Branches=res;
   // console.log(this.Branches);
  }
})
/** religion */
this.StudentServices.GetAllReligion().subscribe({
  next:(res:any)=>{
    this.religions=res;
   // console.log(this.religions);
  }
})
/**Status */
this.StudentServices.GetAllStatus().subscribe({
  next:(res:any)=>{
    this.Status=res;
    //console.log(this.Status);
  }
})
/**Gender */
this.StudentServices.GetAllGender().subscribe({
  next:(res:any)=>{
    this.gender=res;
    //console.log(this.Status);
  }
})
/**year */
this.StudentServices.GetAllyears().subscribe({
  next:(res:any)=>{
    this.year=res;
    //console.log(this.Status);
  }
})


}


/**add student */

addStudent(){
  const Student={
    traineeNationalId:this.StusForm.value.nationalNumber,
    arabicFullName:this.StusForm.value.Username,
    englishFullName:this.StusForm.value.userNameE,
    religion:this.StusForm.value.religion,
    address:this.StusForm.value.address,
    gender:this.StusForm.value.type,
    birthDate:this.StusForm.value.DOB,
    firstPhoneNumber:this.StusForm.value.phoneNumber1,
    secondPhoneNumber:this.StusForm.value.phoneNumber2,
    landlineNumber:this.StusForm.value.LinePhone,
    recommender:this.StusForm.value.recommand,
    academicQualification:this.StusForm.value.Quali,
    qualificationObtainingYear:Number(this.StusForm.value.year),
    academicYear:Number(this.StusForm.value.YearStudy),
    militaryStatus:this.StusForm.value.status,
    personalPhoto:"",
    nationalIdCardCopy:"",
    academicQualificationCopy:"",
    branchName:"",
    branchId:Number(this.StusForm.value.branch),
    isActive:true
  }
  console.log(Student);
this.StudentServices.addStudent(Student).subscribe(()=>{
 // console.log(Student );
 
  
  this.ngOnInit();
  this.StusForm.reset();
})

 }

 /** Update */
 UdateStudent(id:any){
this.flag=true;
this.SelectedId=id,
this.StudentServices.getStudentById(id).subscribe((res:any)=>{
  console.log(res);
  this.StusForm.patchValue({
    nationalNumber:res.traineeNationalId,
    Username:res.arabicFullName,
    userNameE:res.englishFullName,
    religion:res.religion,
    address:res.address,
    type:res.gender,
    DOB:res.birthDate,
    phoneNumber1:res.firstPhoneNumber,
    phoneNumber2:res.secondPhoneNumber,
    LinePhone:res.landlineNumber,
    recommand:res.recommender,
    Quali:res.academicQualification,
    year:res.qualificationObtainingYear,
    YearStudy:res.academicYear,
    status:res.militaryStatus,
    // personalImage:res.personalPhoto,
    // nationalImage:res.nationalIdCardCopy,
    // QulifImage:res.academicQualificationCopy,
    branch:res.branchName
  })
  console.log();

})
 }
 /** Save Student */
 Save(){
  const Student={
    traineeId:this.SelectedId,
    traineeNationalId:this.StusForm.value.nationalNumber,
    arabicFullName:this.StusForm.value.Username,
    englishFullName:this.StusForm.value.userNameE,
    religion:this.StusForm.value.religion,
    address:this.StusForm.value.address,
    gender:this.StusForm.value.type,
    birthDate:this.StusForm.value.DOB,
    firstPhoneNumber:this.StusForm.value.phoneNumber1,
    secondPhoneNumber:this.StusForm.value.phoneNumber2,
    landlineNumber:this.StusForm.value.LinePhone,
    recommender:this.StusForm.value.recommand,
    academicQualification:this.StusForm.value.Quali,
    qualificationObtainingYear:Number(this.StusForm.value.year),
    academicYear:Number(this.StusForm.value.YearStudy),
    militaryStatus:this.StusForm.value.status,
    personalPhoto:"",
    nationalIdCardCopy:"",
    academicQualificationCopy:"",
    branchName:"",
    branchId:Number(this.StusForm.value.branch),
    isActive:true
  }
  this.StudentServices.UpdateStudent(Student).subscribe(({
    next:(res:any)=>{
      this.StusForm.reset();
      this
      this.flag=false;
      this.ngOnInit();
    }
  }))
 }
/** Reset */
back(){
  this.StusForm.reset();
  this.flag=false
}

/**Delete Student */
DeleteStudent(id:any){
this.StudentServices.deleteStudent(id).subscribe(()=>{
  //console.log("del");
  this.ngOnInit();

})
}
/**deactivate Student */
deactivateStudent(id:any){
  this.StudentServices.deactivStudent(id).subscribe(()=>{
    this.ngOnInit();
  })
  }
}
