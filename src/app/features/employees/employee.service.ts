import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/services/api.service";
import { Employee } from "./employee.model";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  endpoint  = '/employees';
  private apiService = inject(ApiService);

  getEmployees(): Observable<Employee[]> {
    return this.apiService.get<Employee[]>(`${this.endpoint}`);
  }

  createEmployee(employeeData: Object): Observable<Employee> {
    return this.apiService.post<Employee>(`${this.endpoint}`, employeeData);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.apiService.get<Employee>(`${this.endpoint}/${id}`);
  }

  updateEmployee(id: number, employeeData: Object): Observable<Employee> {
    return this.apiService.put<Employee>(`${this.endpoint}/${id}`, employeeData);
  }

  deleteEmployeeBy(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}
