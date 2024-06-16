import { Entity } from 'typeorm';
import { Consent } from 'entities/Schemas/ConsentSchema';

@Entity('Students_Consent')
export class StudentConsent extends Consent {}
