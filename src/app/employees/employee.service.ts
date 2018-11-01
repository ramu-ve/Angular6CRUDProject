import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from '../../../node_modules/rxjs/operators';


@Injectable()
export class EmployeeService {

    baseUrl = 'http://localhost:3000/employees';
    // baseUrl = 'http://localhost:39029/api/employees';

    constructor(private _httpClient: HttpClient) { }
    employeeList: Employee[] = [
        {
            id: 1,
            name: 'Mark',
            gender: 'Male',
            contactPreference: 'Email',
            email: 'mark@pragimtech.com',
            dateOfBirth: new Date('10/25/1988'),
            department: '3',
            isActive: true,
            photoPath: 'assets/images/mark.png'
        },
        {
            id: 2,
            name: 'Mary',
            gender: 'Female',
            contactPreference: 'Phone',
            phoneNumber: 2345978640,
            dateOfBirth: new Date('11/20/1979'),
            department: '2',
            isActive: false,
            photoPath: 'assets/images/mary.png'
        },
        {
            id: 3,
            name: 'John',
            gender: 'Male',
            contactPreference: 'Phone',
            phoneNumber: 5432978640,
            dateOfBirth: new Date('3/25/1976'),
            department: '3',
            isActive: false,
            photoPath: 'assets/images/john.png'
        },
    ];

    getEmployees(): Observable<Employee[]> {
        return this._httpClient.get<Employee[]>(this.baseUrl)
            .pipe();
    }

    // private handleError(errorResponse: HttpErrorResponse) {
    //     if (errorResponse.error instanceof ErrorEvent) {
    //         console.log('client side error' + errorResponse.error.message);
    //     } else {
    //         console.log('Server side error' + errorResponse);
    //     }

    //     return new ErrorObservable('There is a prblem with the service. Please try again later.');
    // }

    private handleException(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.log('client side error' + errorResponse.error.message);
        } else {
            console.log('Server side error' + errorResponse);
        }
    }


    getEmployee(id: Number): Observable<Employee> {
        return this._httpClient.get<Employee>(`${this.baseUrl}/${id}`).pipe();
    }

    addEmployee(emp: Employee): Observable<Employee> {
        return this._httpClient.post<Employee>(this.baseUrl, emp, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }).pipe();
    }

    updateEmployee(emp: Employee): Observable<void> {
        return this._httpClient.put<void>(`${this.baseUrl}/${emp.id}`, emp, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }).pipe();
    }

    deleteEmployee(id: number): Observable<void> {
       return this._httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe();
    }
}
