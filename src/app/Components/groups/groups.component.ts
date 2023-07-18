import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/Service/Group.Service';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {


  groups: any;
  isEdit: boolean = false;
  selectedGroupID!: number;
  falseValue: any;
  ischecked:boolean=false;
  showTable=false;

  constructor(private groupService: GroupService) { }
  ngOnInit(): void {
    this.loadAllGroubs();
  }

  CheckedboxChange(){
    if(this.ischecked==false){
      this.ischecked=true;
    }
    else{
        this.ischecked=false;
      }
    }




  GroupAuthForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    all: new FormControl(''),
    academyinnumber: new FormControl(''),
    users: new FormControl(''),
    Groups: new FormControl(''),
    branches: new FormControl(''),
    Courses: new FormControl(''),
    Subject: new FormControl(''),
    Student: new FormControl(''),
  });



  // This Function To Return all Groubs
  loadAllGroubs(): void {
    this.groupService.getAllGroupsAuth().subscribe(
      (result: any) => {
        this.groups = result;
      }
    );
  }

  setFalseValueAcademyNumbers: boolean = true;
  setFalseValuegroupsPage: boolean = true;
  setFalseValueusersPage: boolean = true;
  setFalseValuebranchesPage: boolean = true;
  setFalseValuecoursesPage: boolean = true;
  setFalseValuesubjectsPage: boolean = true;
  setFalseValuetraineeAdditionPage: boolean = true;
  resetFalsyValyes() {
    this.setFalseValueAcademyNumbers=true;
    this.setFalseValuegroupsPage = true;
    this.setFalseValueusersPage = true;
    this.setFalseValuebranchesPage = true;
    this.setFalseValuecoursesPage = true;
    this.setFalseValuesubjectsPage = true;
    this.setFalseValuetraineeAdditionPage = true;
  }
  addNewGroup() {
    if (this.GroupAuthForm.value.all) {
      const Group = {
        groupName: this.GroupAuthForm.value.name,
        academyInNumbersPage: true,
        groupsPage: true,
        usersPage: true,
        branchesPage: true,
        coursesPage: true,
        subjectsPage: true,
        traineeAdditionPage: true,
        coursesToTraineeAdditionPage: true,
        traineeCombinedAccountStatementPage: true,
      }
      console.log(Group);
      this.groupService.add(Group).subscribe(() => {
        console.log("Done New Group Added");
        this.loadAllGroubs();
        this.GroupAuthForm.reset();
      });
    }
     else {
      if (!this.GroupAuthForm.value.academyinnumber) {
        this.setFalseValueAcademyNumbers = false;
      }
      if (!this.GroupAuthForm.value.Groups) {
        this.setFalseValuegroupsPage= false;

      }
      if (!this.GroupAuthForm.value.users) {
        this.setFalseValueusersPage=false;
      }
      if (!this.GroupAuthForm.value.branches) {
        this.setFalseValuebranchesPage=false;

      }
      if (!this.GroupAuthForm.value.Courses) {
        this.setFalseValuecoursesPage=false;

      }
      if (!this.GroupAuthForm.value.Subject) {
        this.setFalseValuesubjectsPage=false;

      }
      if (!this.GroupAuthForm.value.Student) {
        this.setFalseValuetraineeAdditionPage=false;

      }
      const Group = {
        groupName: this.GroupAuthForm.value.name,
        academyInNumbersPage: this.setFalseValueAcademyNumbers,
        groupsPage: this.setFalseValuegroupsPage,
        usersPage: this.setFalseValueusersPage,
        branchesPage: this.setFalseValuebranchesPage,
        coursesPage: this.setFalseValuecoursesPage,
        subjectsPage: this.setFalseValuesubjectsPage,
        traineeAdditionPage: this.setFalseValuetraineeAdditionPage,
        coursesToTraineeAdditionPage: this.setFalseValuetraineeAdditionPage,
        traineeCombinedAccountStatementPage: this.setFalseValuetraineeAdditionPage,
      }

      console.log(Group);
      this.groupService.add(Group).subscribe(() => {
        console.log("Done New Group Added");
        this.loadAllGroubs();
        this.GroupAuthForm.reset();
      });
    }

  }

  DeleteGroup(id: number) {
    this.groupService.Delete(id).subscribe(() => {
      console.log("deleted")
      this.loadAllGroubs();
    })
  }

  EditGroup(id: number) {
this.showTable=true;
    this.selectedGroupID = id;
    this.groupService.GetGroupByID(id).subscribe((result: any) => {
      console.log(result);
      this.isEdit = true;
      const group = result
      this.GroupAuthForm.patchValue({
        name: group.groupName,
        academyinnumber: group.academyInNumbersPage,
        Groups: group.groupsPage,
        users: group.usersPage,
        branches: group.branchesPage,
        Courses: group.coursesPage,
        Subject: group.subjectsPage,
        Student: group.traineeAdditionPage
      });
      console.log(this.isEdit);
      console.log(this.selectedGroupID);

    })
  }

  saveUpdate() {
    const group2 = {
      groupName: this.GroupAuthForm.value.name,
      academyInNumbersPage: this.GroupAuthForm.value.academyinnumber,
      groupsPage: this.GroupAuthForm.value.Groups,
      usersPage: this.GroupAuthForm.value.users,
      branchesPage: this.GroupAuthForm.value.branches,
      coursesPage: this.GroupAuthForm.value.Courses,
      subjectsPage: this.GroupAuthForm.value.Subject,
      traineeAdditionPage: this.GroupAuthForm.value.Student,
      coursesToTraineeAdditionPage: this.GroupAuthForm.value.Student,
      traineeCombinedAccountStatementPage: this.GroupAuthForm.value.Student,
      groupId: this.selectedGroupID,

    }
    console.log(group2);
    console.log("I AM IN save Updates");
    this.groupService.Update(group2).subscribe(() => {
      console.log("edited")
      this.loadAllGroubs();
      this.GroupAuthForm.reset();
      this.isEdit = false;
      console.log(group2);

    })
    this.showTable=false;

  }





  get GetAll() {
    return this.GroupAuthForm.controls['all'];
  }
  get groupName() {
    return this.GroupAuthForm.controls['name'];
  }

  AddNewGroup(e: any) {
    e.preventDefault();
  }

}
