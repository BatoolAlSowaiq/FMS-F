import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  
  @Input()
  farmId: number | null;

  @Input()
  employeeList: Employee[];

  
  // To control paginator 
  totalFarms: number = 0; 
  pageIndex: number = 0;
  pageSize: number = 9;

  isNoMatch : boolean = false;


  // Search 
  searchInput$ = new Subject<string>();
  query: string = '';
  isSearchVisible: boolean = false;
  
  constructor(private employeeService: EmployeeService, private snackBar: MatSnackBar) {

    this.farmId = null;
    this.employeeList = [];
    // Apply search 
    this.searchInput$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.employeeService.searchEmployees(this.farmId,query))
    )
    .subscribe({
      next: (employees: Employee[]) => {
        this.employeeList = employees;
      },
      error: (e) =>{
        console.error('No match:', e);
        this.isNoMatch =  true;
        
      }
    });
  }

  // Control page changes
  onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex;
  }

  // Control visibility of search 
  toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.query = '';
      this.searchInput$.next(this.query);
    }
  }

}
