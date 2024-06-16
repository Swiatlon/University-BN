import { Entity } from 'typeorm';
import { Consent } from 'entities/Schemas/ConsentSchema';

@Entity('Employee_Consent')
export class EmployeeConsent extends Consent {}
