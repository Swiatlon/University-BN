import { Entity } from 'typeorm';
import { Address } from './Schemas/AddressSchema';
import { IStudentAddress } from 'interfaces/IStudentAddress';

@Entity('Students_Addresses')
export class StudentAddress extends Address implements IStudentAddress {}
