import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { IPersonRelations } from 'interfaces/Persons/IPersons';
import { Person } from '../Schemas/PersonSchema';
import { StudentAddress } from './StudentAddressEntity';
import { StudentConsent } from './StudentConsentEntity';

@Entity('Students')
export class Student extends Person implements IPersonRelations {
    @OneToOne(() => StudentConsent, { cascade: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'consent_id',
    })
    consentId: string;

    @OneToOne(() => StudentAddress, { cascade: true, nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'address_id' })
    addressId!: string;
}
