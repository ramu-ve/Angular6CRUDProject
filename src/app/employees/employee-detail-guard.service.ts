import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '../../../node_modules/@angular/router';
import { Injectable } from '../../../node_modules/@angular/core';
import { EmployeeService } from './employee.service';
import {map, catchError} from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class EmployeeDetailGuardService implements CanActivate {
    constructor(private _employeeSerivce: EmployeeService,
        private _router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._employeeSerivce.getEmployee(+route.paramMap.get('id')).pipe(
            map(emp => {
                const employeeExists = !!emp;

                if (employeeExists) {
                    return true;
                } else {
                    this._router.navigate(['notfound']);
                    return false;
                }
            }
        ),
        catchError((err) => {
                console.log(err);
                return Observable.of(false);
        })
    );
    }
}
