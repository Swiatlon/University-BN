import { Entity } from 'typeorm';
import { Consent } from './Schemas/ConsentSchema';
import { IConsent } from 'interfaces/IConsent';

@Entity('Students_Consent')
export class StudentConsent extends Consent implements IConsent {}
