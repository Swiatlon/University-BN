import { Entity } from 'typeorm';
import { Address } from '../schemas/Address.Schema';

@Entity('Students_Addresses')
export class StudentAddress extends Address {}
