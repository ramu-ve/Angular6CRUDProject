import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  // employeeData: Employee;
  employees: Employee[];
  filteredEmployees: Employee[];
  private _searchTerm: string;
  error: any;
  // employeeToDisplay: Employee;
  // arrayIndex = 1;

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployeeBySearchText(this._searchTerm);
  }

  get searchTerm(): string {
    return this._searchTerm;
  }
  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    // const resolvedData: Employee[] | string = this._activatedRoute.snapshot.data['employeeList'];
      this.employees = this._activatedRoute.snapshot.data['employeeList'];
    // if (Array.isArray(resolvedData)) {
    //   this.employees = resolvedData;
    // } else {
    //   console.log('test');
    //   this.error = resolvedData;
    // }

    if (this._activatedRoute.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._activatedRoute.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }

  }

  ngOnInit() { }

  filterEmployeeBySearchText(searchText: string): Employee[] {
    return this.employees.filter(emp => emp.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

  deleteNotification(id: number) {
    const indexId = this.filteredEmployees.findIndex(e => e.id === id);
    if (indexId !== -1) {
      this.filteredEmployees.splice(indexId, 1);
    }
  }


}
