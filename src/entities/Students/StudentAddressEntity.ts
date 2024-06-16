import { Entity } from 'typeorm';
import { Address } from '../Schemas/AddressSchema';

@Entity('Students_Addresses')
export class StudentAddress extends Address {}
