import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { IEmployeeRelations } from 'interfaces/Persons/IPersons';
import { Person } from '../Schemas/Person.Schema';
import { EmployeeAddress } from './EmployeeAddress.Entity';
import { EmployeeConsent } from './EmployeeConsent.Entity';

@Entity('Employees')
export class Employee extends Person implements IEmployeeRelations {
    @OneToOne(() => EmployeeConsent, { cascade: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'consent_id',
    })
    consentId: string;

    @OneToOne(() => EmployeeAddress, { cascade: true, nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'address_id' })
    addressId!: string;
}
