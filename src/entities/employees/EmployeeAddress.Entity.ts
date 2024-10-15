import { Entity } from 'typeorm';
import { Address } from '../schemas/Address.Schema';

@Entity('Employees_Addresses')
export class EmployeeAddress extends Address {}
