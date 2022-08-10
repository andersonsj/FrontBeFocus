import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivateChild {

  constructor(private router: Router, private authService: AuthService) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let validation: any;

    this.authService.userCurrent.subscribe(data => {
      validation = data.companyCode;
    });

    if (validation == 0) {
      this.router.navigate(["/home/auth/login"]);
      return false;
    }

    return true;
  }

}
