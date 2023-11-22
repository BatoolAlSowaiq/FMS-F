import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly API_URL = "http://localhost:8080/API/Employee"; 

  constructor(private http: HttpClient) { }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_URL}/${employeeId}`);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API_URL);
  }

  searchEmployees(farmId: number | null , query: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.API_URL}/${farmId}/search?q=${query}`);
  }

  createEmployee(employee: Employee): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/Add`, employee);
  }

  updateEmployee(employee: Employee, employeeId: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${employeeId}`, employee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${employeeId}`);
  }
}
