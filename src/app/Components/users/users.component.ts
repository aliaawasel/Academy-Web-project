import { Component,OnInit} from '@angular/core';
import { UserService } from 'src/Service/User.Service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    usersForm = new FormGroup({
    Username : new FormControl("",[Validators.required,Validators.minLength(3)]),
    password : new FormControl("", [Validators.required]),
    name : new FormControl("",[Validators.required, Validators.minLength(3)]),
    email : new FormControl("",[Validators.required, Validators.email]),
    phone : new FormControl("",[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('^(010|011|012)[0-9]{8}$')]),
    branch : new FormControl("",[Validators.required]),
    group : new FormControl("",[Validators.required]),
    language : new FormControl("",[Validators.required]),


  })
  get getUserName(){
    return this.usersForm.controls['Username']
  };
  get getName(){
    return this.usersForm.controls['name']
  };
  get getUserEmail(){
    return this.usersForm.controls['email']
  };
  get getUserPassword(){
    return this.usersForm.controls['password']
  };
  get getUserPhone(){
    return this.usersForm.controls['phone']
  };
  get getUserGroup(){
    return this.usersForm.controls['group']
  };
  get getUserBranch(){
    return this.usersForm.controls['branch']
  };
  get getUserLanguage(){
    return this.usersForm.controls['language']
  };
 /** validaion */
 formHandler(e:any){

 }
  AllUsers:any
  Branches:any
  Groups:any
  Languages:any
  user:any
  selectedId:any
  constructor(
    private userService:UserService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
    ){}

ngOnInit(): void {
  /**  Get All Branches */
  this.userService.getBranch().subscribe({
    next:(Response:any) =>{
      this.Branches=Response;
        },
    error:(error) =>{
      console.log(error);
    }
  })
/**  Get All Groups */
  this.userService.getGroup().subscribe({
    next:(Response:any) =>{
      this.Groups=Response;
    },
    error:(error) =>{
      console.log(error); 
    }
  })
  /** Get All Langusges */
  this.userService.getLanguage().subscribe({
    next:(Response:any) =>{
      this.Languages=Response;
    },
    error:(error) =>{
      console.log(error); 
    }
   })
 /* Get All Users*/ 
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        this.AllUsers = response;     
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
/** Add Uer */ 
flag:boolean=false;
addUser(){
  const user ={
    username:this.usersForm.value.Username,
    password:this.usersForm.value.password,
    fullName:this.usersForm.value.name,
    email:this.usersForm.value.email,
    phoneNumber:this.usersForm.value.phone,
    groupId:Number(this.usersForm.value.group),
    languageId:Number(this.usersForm.value.language),
    branchId:Number(this.usersForm.value.branch),
   
  }
  console.log(user);
  this.userService.addUser(user).subscribe(()=>{
   console.log(user); 
   this.usersForm.reset();
   this.ngOnInit()
  })
}
/** Update User */
editUser(id:any){
  this.flag=true;
  this.selectedId =id;
  this.userService.getUserById(id).subscribe((res :any)=>{
    this.usersForm.patchValue({
    Username:res.username,
    password:res.password,
    name:res.fullName,
    email:res.email,
    phone:res.phoneNumber,
     group:res.groupId,
    branch:res.branchId,
    language:res.languageId
    }) 
  })
}
/** Save User */
saveUser(){
  const user ={
    userId:this.selectedId,
    username:this.usersForm.value.Username,
    password:this.usersForm.value.password,
    fullName:this.usersForm.value.name,
    email:this.usersForm.value.email,
    phoneNumber:this.usersForm.value.phone,
    groupId:Number(this.usersForm.value.group),
    languageId:Number(this.usersForm.value.language),
    branchId:Number(this.usersForm.value.branch),
    isActive:true,
    
  }
  console.log(user);
  this.userService.editUser(user).subscribe(({
    next:(res:any)=>{
      this.usersForm.reset();
      this.flag=false;
    this.ngOnInit();
    }
  }))
}
/** Backتراجع  */
back(){
  this.usersForm.reset();
  this.flag=false
}
/** Delete User */
deleteUser(id:any){
this.userService.deleteUser(id).subscribe(() =>{  
console.log("deleted")
this.ngOnInit();
  })}
  deactivUser(id:any){
    this.userService.deactiveUser(id).subscribe(()=>{
      this.ngOnInit(); 
    })
    }
}