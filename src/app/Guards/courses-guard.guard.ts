import { CanActivateFn ,Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import { inject } from '@angular/core';

export const coursesGuardGuard: CanActivateFn = (route, state) => {
  const token=localStorage.getItem("token");

  if(token!=null){
    const tokenData:any=jwt_decode(token);
  
    if(tokenData.CoursesPage==="True")
        {
          return true 
        }
    else
        {
        alert("Log in first!");
        inject(Router).navigate(['/home'])
        return false
        }
      }else{
    alert("Log in first!");
    inject(Router).navigate(['/home'])
    return false
  }};
