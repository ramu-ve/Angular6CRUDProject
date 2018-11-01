import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, Route, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  public pageTitle: string;
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto: Boolean = false;
  dateConfig: Partial<BsDatepickerConfig>;
  employee: Employee;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payrroll' }
  ];
  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.dateConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'YYYY/MM/DD'
      });
  }

  ngOnInit() {
    this._route.paramMap.subscribe(p => {
      const id = +p.get('id');
      this.getEmployee(id);
    });
  }

  togglePhotoPreview(): void {
    this.previewPhoto = !this.previewPhoto;
  }

  saveEmployee(): void {
    if(this.employee.id === null)
    {
    this._employeeService.addEmployee(this.employee).subscribe(
      (data: Employee) => {
        console.log(data);
        this.createEmployeeForm.reset();
        this._router.navigate(['list']);
      },
      (error: any) => { console.log(error); }
    );
  } else {
    this._employeeService.updateEmployee(this.employee).subscribe(
      () => {
        this.createEmployeeForm.reset();
        this._router.navigate(['list']);
      },
      (err) => console.log(err)
    );
  }
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: null,
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: 'Select Department',
        isActive: null,
        photoPath: null,
      };

      this.createEmployeeForm.reset();
      this.pageTitle = 'Create Employee';
    } else {
      this.pageTitle = 'Edit Employee';
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (error: any) => console.log(error)
        );
    }

  }

}
