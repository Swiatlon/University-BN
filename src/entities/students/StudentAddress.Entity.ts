import { Entity } from 'typeorm';
import { Address } from '../Schemas/Address.Schema';

@Entity('Students_Addresses')
export class StudentAddress extends Address {}
