import { Entity } from 'typeorm';
import { Address } from '../Schemas/AddressSchema';

@Entity('Employee_Addresses')
export class EmployeeAddress extends Address {}
