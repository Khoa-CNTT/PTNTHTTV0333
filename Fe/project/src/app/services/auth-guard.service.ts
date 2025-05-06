import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from '../models/UserRole';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private userService: UserService, private jwtService: JwtService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logged = this.jwtService.verifyToken();
    if(!logged) {
      console.log(logged);
      console.log("bạn cần phải đăng nhập");
      this.router.navigateByUrl("/auth/login")
      return false;
    }else{
      const userRole: UserRole[] = [];
      const roleData = localStorage.getItem('Role_Key');
      const roles = JSON.parse(roleData);
      console.log(roles);
      for(let role of roles){
        console.log("role trong vong lap: " + role);
        if(role.authority === 'ADMIN'){
          userRole.push(UserRole.admin);
          console.log("accountRole sau khi push:" + userRole);
        }else{
          userRole.push(UserRole.user);
        }
      }
      console.log("userRole: " + userRole);
      const requiredRoles: any = route.data.roles as UserRole[];
      if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.some(role => userRole.includes(role))) {
        console.log("chưa có quyền");
        return false;
      }
      return true;
    }
  }
}
