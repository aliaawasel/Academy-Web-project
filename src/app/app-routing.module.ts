import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './Components/users/users.component';
import { SubjectsComponent } from './Components/subjects/subjects.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { studentsComponent } from './Components/students/students.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { LoginComponent } from './Components/login/login.component';
import { StudentCourseComponent } from './Components/student-course/student-course.component';
import { HomeComponent } from './Components/home/home.component';
import { PaymentsComponent } from './Components/payments/payments.component';
import { groupsGuardGuard } from './Guards/groups-guard.guard';
import { branchGuardGuard } from './Guards/branch-guard.guard';
import { coursesGuardGuard } from './Guards/courses-guard.guard';
import { subjectGuardGuard } from './Guards/subject-guard.guard';
import { coursesToTraineeAdditionPageGuardGuard } from './Guards/courses-to-trainee-addition-page-guard.guard';
import { traineeAdditionPageGuardGuard } from './Guards/trainee-addition-page-guard.guard';
import { traineeCombinedAccountStatementPageGuardGuard } from './Guards/trainee-combined-account-statement-page-guard.guard';
import { usersPagePageGuardGuard } from './Guards/users-page-page-guard.guard';

const routes: Routes = [
  { path:'',component:LoginComponent},
  { path:'home',component:HomeComponent},
  { path:'groups',component:GroupsComponent,canActivate:[groupsGuardGuard]},
  { path:'login',component:LoginComponent},
  { path:'users',component:UsersComponent,canActivate:[usersPagePageGuardGuard]},
  { path:'subjects',component:SubjectsComponent,canActivate:[subjectGuardGuard]},
  { path:'courses',component:CoursesComponent,canActivate:[coursesGuardGuard]},
  { path:'students',component:studentsComponent,canActivate:[traineeAdditionPageGuardGuard]},
  { path:'payments',component:PaymentsComponent,canActivate:[traineeCombinedAccountStatementPageGuardGuard]},
  { path:'branches',component:BranchesComponent,canActivate:[branchGuardGuard]},
  { path:'studentcourse',component:StudentCourseComponent,canActivate:[coursesToTraineeAdditionPageGuardGuard]},







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
