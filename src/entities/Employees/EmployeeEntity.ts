import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { IPersonRelations } from 'interfaces/Persons/IPersons';
import { Person } from '../Schemas/PersonSchema';
import { EmployeeAddress } from './EmployeeAddressEntity';
import { EmployeeConsent } from './EmployeeConsentEntity';

@Entity('Employees')
export class Employee extends Person implements IPersonRelations {
    @OneToOne(() => EmployeeConsent, { cascade: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'consent_id',
    })
    consentId: string;

    @OneToOne(() => EmployeeAddress, { cascade: true, nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'address_id' })
    addressId!: string;
}
