import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BranchService } from './../../../Service/branch.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit
{
  isEdit:boolean=false;
  selectedBranchID!:number;
  branches:any []=[]
  users:any
  validation:boolean=true;

  loadBranches():void{
    this.branchService.GetAllBranch().subscribe((result:any)=>{
      this.branches=result
      console.log(this.branches)
    })
  }
  constructor(private branchService : BranchService ) {
  }
  branchForm =new FormGroup({
    branchName: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
    supervisorName: new FormControl('',[Validators.required]),
    supervisorPhoneNumber: new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('^(010|011|012)[0-9]{8}$')]),
    supervisorLandlineNumber: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(1),Validators.pattern('^[0-9]+$')])
  })
  ngOnInit(): void {
    this.loadBranches();
    this.getUsers();
  }
  getUsers(){
    this.branchService.getusername().subscribe((res)=>{
      this.users=res
      console.log(res)
    })
  }
  DeleteBranch(id:number){
    this.branchService.DeleteBranch(id).subscribe(()=>{
      console.log("deleted")
      this.loadBranches();
  })
  }
  EditBranch(id:number){
    this.selectedBranchID=id;
    this.branchService.GetBranchByID(id).subscribe((result:any)=>{
      console.log(result)
      this.isEdit=true;
      const branch=result
      this.branchForm.patchValue({
        branchName:branch.name,
        supervisorName:branch.supervisorName,
        supervisorPhoneNumber:branch.supervisorPhoneNumber,
        supervisorLandlineNumber:branch.supervisorLandlineNumber
      })
    })
  }
  saveUpdate(){
    const branch={
      id:this.selectedBranchID,
      name:this.branchForm.value.branchName,
      supervisorName:this.branchForm.value.supervisorName,
      supervisorPhoneNumber:this.branchForm.value.supervisorPhoneNumber,
      supervisorLandlineNumber:this.branchForm.value.supervisorLandlineNumber}
    this.branchService.UpdateBranch(branch).subscribe(()=>{
      console.log("edited")
      this.loadBranches();
      this.branchForm.reset();
      this.isEdit=false
  })
  }
  AddBranch(){
    const branch={
      name:this.branchForm.value.branchName,
      supervisorName:this.branchForm.value.supervisorName,
      supervisorPhoneNumber:this.branchForm.value.supervisorPhoneNumber,
      supervisorLandlineNumber:this.branchForm.value.supervisorLandlineNumber
    }
    console.log(branch)
    this.branchService.AddBranch(branch).subscribe(()=>{
      console.log("added");
      this.loadBranches();
      this.branchForm.reset();
    })
  }
  back(){
    this.isEdit=false;
    this.branchForm.reset();
  }
  formHandelr(e:any){

  }
get getBranchName(){
  return this.branchForm.controls['branchName']
}
get getSupervisorName(){
  return this.branchForm.controls['supervisorName']
}
get getSupervisorPhoneNumber(){
  return this.branchForm.controls['supervisorPhoneNumber']
}
get getSupervisorLandlineNumber(){
  return this.branchForm.controls['supervisorLandlineNumber']
}
}
