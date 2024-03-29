import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { IStudent } from 'interfaces/IStudent';
import { Person } from './Schemas/PersonSchema';
import { StudentAddress } from './StudentAddressEntity';

@Entity('Students')
export class Student extends Person implements IStudent {
    @OneToOne(() => StudentAddress, { cascade: true, nullable: false })
    @JoinColumn({ name: 'address_id' })
    addressId!: string;
}
