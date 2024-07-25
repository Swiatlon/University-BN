import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Person } from '../Schemas/Person.Schema';
import { EmployeeAddress } from './EmployeeAddress.Entity';
import { EmployeeConsent } from './EmployeeConsent.Entity';
import { IEmployeeRelations } from 'types/Persons/Employee/Employees.Interfaces';

@Entity('Employees')
export class Employee extends Person implements IEmployeeRelations {
    @OneToOne(() => EmployeeConsent, { cascade: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'consent_id',
    })
    consent: string;

    @OneToOne(() => EmployeeAddress, { cascade: true, nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'address_id' })
    address!: string;
}
