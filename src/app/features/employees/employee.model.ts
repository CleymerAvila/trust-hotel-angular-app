
export interface Employee {
  employeeId: number;
  dni: string;
  name: string;
  email: string;
  phone: string;
  salary: number;
  workShift: string;
  type: string;
  bonus?: number;
  department?: string;
  mainLanguage?: string;
}
