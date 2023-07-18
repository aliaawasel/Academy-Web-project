import { Component ,DoCheck} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck {

  constructor( private router:Router) {}

  token:any
  navhidden=false;

  ngDoCheck(): void {
    this.token=localStorage.getItem("token");
   
   if(this.token!=null){
    this.navhidden=true;
  
   }else{
    this.navhidden=false;

   }
  
  }
    signOut(){
    localStorage.clear()
    this.navhidden=false;
    this.router.navigate(['/login']);
    }
    
}
