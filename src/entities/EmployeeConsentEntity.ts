import { Entity } from 'typeorm';
import { Consent } from './Schemas/ConsentSchema';
import { IConsent } from 'interfaces/IConsent';

@Entity('Employee_Consent')
export class EmployeeConsent extends Consent implements IConsent {}
