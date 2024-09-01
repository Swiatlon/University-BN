import { Entity } from 'typeorm';
import { Address } from '../Schemas/Address.Schema';

@Entity('Employees_Addresses')
export class EmployeeAddress extends Address {}
