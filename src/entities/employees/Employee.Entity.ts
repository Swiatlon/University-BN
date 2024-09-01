import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExtendedPerson } from 'entities/Schemas/ExtendedPerson.Schema';
import { EmployeeAddress } from './EmployeeAddress.Entity';
import { EmployeeConsent } from './EmployeeConsent.Entity';
import { IEmployee } from 'types/Persons/Employee/Employees.Interfaces';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Consent } from 'entities/Schemas/Consent.Schema';
import { Address } from 'entities/Schemas/Address.Schema';
import { EventOrganizer } from 'entities/Events/EventOrganizer.Entity';

@Entity('Employees')
export class Employee extends ExtendedPerson implements IEmployee {
    @PrimaryGeneratedColumn()
    id!: string;

    @OneToOne(() => EmployeeConsent, { cascade: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'consent_id',
    })
    consent!: Consent;

    @OneToOne(() => EmployeeAddress, { cascade: true, nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'address_id' })
    address!: Address;

    @OneToOne(() => UserAccount, { cascade: true, nullable: true })
    @JoinColumn({
        name: 'account_id',
    })
    account!: UserAccount;

    @ManyToOne(() => EventOrganizer, { cascade: true, nullable: true })
    @JoinColumn({
        name: 'organizer_id',
    })
    organizer!: EventOrganizer;
}
