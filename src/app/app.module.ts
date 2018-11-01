import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DatepickerModule, BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import {SelectRequiredValidatorDirective} from '../app/shared/select-required-validator.directive';
import {CompareEqualValidatorDirective} from '../app/shared/compare-equal-validator.directive';
import {EmployeeService} from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import {CreateComponentCanDeactivateGuardService} from './employees/create-component-can-deactivate-guard.serive';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import {EmployeeFilterPipe} from './employees/employee-filter.pipe';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailGuardService } from './employees/employee-detail-guard.service';
import { AccordianComponent } from './shared/accordian.component';



export const appRoutes: Routes = [
{
  path: 'list',
  component: ListEmployeesComponent,
  resolve: { employeeList: EmployeeListResolverService}
},
{
  path: 'edit/:id',
  component: CreateEmployeeComponent,
  canDeactivate: [CreateComponentCanDeactivateGuardService]
},
{
  path: 'employees/:id',
  component: EmployeeDetailsComponent,
  canActivate: [EmployeeDetailGuardService]
},
{path: '', redirectTo: '/list', pathMatch: 'full'},
{path: 'notfound', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    CompareEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordianComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [EmployeeService, CreateComponentCanDeactivateGuardService, EmployeeListResolverService, EmployeeDetailGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
