import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './Components/users/users.component';
import { SubjectsComponent } from './Components/subjects/subjects.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { studentsComponent } from './Components/students/students.component';
// import { PaymentsComponent } from './Components/payments/payments.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { LoginComponent } from './Components/login/login.component';

import { StudentCourseComponent } from './Components/student-course/student-course.component';


const routes: Routes = [
  { path:'',component:GroupsComponent},
  { path:'groups',component:GroupsComponent},
  { path:'login',component:LoginComponent},
  { path:'users',component:UsersComponent},
  { path:'subjects',component:SubjectsComponent},
  { path:'courses',component:CoursesComponent},
  { path:'students',component:studentsComponent},
  // { path:'payments',component:PaymentsComponent},
  { path:'branches',component:BranchesComponent},
  { path:'studentcourse',component:StudentCourseComponent},







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
