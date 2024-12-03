export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    department: Department;
}

export type Department = 'кардиология' | 'хирургия';

export interface Doctor extends Employee {
    isHead: boolean;
}

export type Nurse = Employee;

export type Staff = Doctor | Nurse;

export type StaffType = 'doctor' | 'nurse';
