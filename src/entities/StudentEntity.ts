import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { IStudent } from 'interfaces/IStudent';
import { Person } from './Schemas/PersonSchema';
import { UserAccount } from './UserAccountEntity';

@Entity('Students')
export class Student extends Person implements IStudent {
    @OneToOne(() => UserAccount, { cascade: true })
    @JoinColumn({ name: 'account_id' })
    accountId!: string;
}
