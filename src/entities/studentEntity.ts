import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { IStudent } from 'interfaces/IStudent';
import { IsUUID } from 'class-validator';
import { Person } from './schemas/PersonSchema';
import { UserAccount } from './userAccountEntity';

@Entity('Students')
export class Student extends Person implements IStudent {
    @OneToOne(() => UserAccount)
    @JoinColumn({ name: 'account_id' })
    @IsUUID()
    accountId!: string;
}
