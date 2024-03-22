import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { IStudent } from 'interfaces/IStudent';
import { Person } from './Schemas/PersonSchema';
import { EmployeeAddress } from './EmployeeAddressEntity';

@Entity('Employees')
export class Employee extends Person implements IStudent {
    @OneToOne(() => EmployeeAddress, { cascade: true, nullable: false })
    @JoinColumn({ name: 'address_id' })
    addressId!: string;
}
