import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../node_modules/@angular/router';
import { Employee } from '../models/employee.model';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { EmployeeService } from './employee.service';
import { Injectable } from '../../../node_modules/@angular/core';
import {catchError} from 'rxjs/operators';

@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[] | string> {

    constructor(private employeeService: EmployeeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
        return this.employeeService.getEmployees()
        .pipe(
                catchError((err: string) => Observable.of(err))
              );
    }
}
