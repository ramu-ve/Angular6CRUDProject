import { PipeTransform, Pipe } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
name: 'employeeFilter',
pure: true
})
export class EmployeeFilterPipe implements PipeTransform {
    transform(employees: Employee[], searchTerm: string): Employee[] {
        if (!employees || !searchTerm) {
            return employees;
        } else {
            return employees.filter(emp => emp.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
        }
    }
}
