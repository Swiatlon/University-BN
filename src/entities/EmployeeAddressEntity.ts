import { Entity } from 'typeorm';
import { Address } from './Schemas/AddressSchema';
import { IStudentAddress } from 'interfaces/IStudentAddress';

@Entity('Employee_Addresses')
export class EmployeeAddress extends Address implements IStudentAddress {}
