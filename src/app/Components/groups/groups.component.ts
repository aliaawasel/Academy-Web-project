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
  constructor(private groupService: GroupService) { }
  ngOnInit(): void {
    this.loadAllGroubs();
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
    } else {

      const Group = {
        groupName: this.GroupAuthForm.value.name,
        academyInNumbersPage: this.GroupAuthForm.value.academyinnumber,
        groupsPage: this.GroupAuthForm.value.Groups,
        usersPage: this.GroupAuthForm.value.users,
        branchesPage: this.GroupAuthForm.value.branches,
        coursesPage: this.GroupAuthForm.value.Courses,
        subjectsPage: this.GroupAuthForm.value.Subject,
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

  }


  DeleteGroup(id: number) {
    this.groupService.Delete(id).subscribe(() => {
      console.log("deleted")
      this.loadAllGroubs();
    })
  }

  EditGroup(id: number) {

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
        Student: group.studentsPage
      });
      console.log(this.isEdit);
      console.log(this.selectedGroupID);

    })
  }

  saveUpdate() {
    const group = {
      groupName: this.GroupAuthForm.value.name,
      academyInNumbersPage: this.GroupAuthForm.value.academyinnumber,
      groupsPage: this.GroupAuthForm.value.Groups,
      usersPage: this.GroupAuthForm.value.users,
      branchesPage: this.GroupAuthForm.value.branches,
      coursesPage: this.GroupAuthForm.value.Courses,
      subjectsPage: this.GroupAuthForm.value.Subject,
      traineeAdditionPage: true,
      coursesToTraineeAdditionPage: true,
      traineeCombinedAccountStatementPage: true,
      groupId: this.selectedGroupID,

    }
    console.log("I AM IN save Updates");
    this.groupService.Update(group).subscribe(() => {
      console.log("edited")
      this.loadAllGroubs();
      this.GroupAuthForm.reset();
      this.isEdit = false;

    })

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
