import { Entity } from 'typeorm';
import { Consent } from 'entities/Schemas/Consent.Schema';

@Entity('Students_Consents')
export class StudentConsent extends Consent {}
