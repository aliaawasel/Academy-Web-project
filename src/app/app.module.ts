import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { UsersComponent } from './Components/users/users.component';
import { studentsComponent } from './Components/students/students.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { SubjectsComponent } from './Components/subjects/subjects.component';
// import { PaymentsComponent } from './Components/payments/payments.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { StudentCourseComponent } from './Components/student-course/student-course.component';
import { StudentsServices } from 'src/Service/StudentsServices.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    UsersComponent,
    BranchesComponent,
    SubjectsComponent,
    // PaymentsComponent,
    studentsComponent,
    CoursesComponent,
    GroupsComponent,
    StudentCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
