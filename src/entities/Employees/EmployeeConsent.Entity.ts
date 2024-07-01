import { Entity } from 'typeorm';
import { Consent } from 'entities/Schemas/Consent.Schema';

@Entity('Employees_Consents')
export class EmployeeConsent extends Consent {}
