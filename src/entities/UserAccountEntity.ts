import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserAccount } from 'interfaces/IUserAccount';
import { Validation } from 'constants/validators/validatorsConstants';

@Entity('Users_Accounts')
export class UserAccount implements IUserAccount {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        unique: true,
        type: 'varchar',
        nullable: false,
        length: Validation.LOGIN.MAX_LENGTH,
    })
    login!: string;

    @Column({
        unique: true,
        type: 'varchar',
        nullable: false,
        length: Validation.EMAIL.MAX_LENGTH,
    })
    email!: string;

    @Column({
        nullable: false,
        length: Validation.PASSWORD.MAX_LENGTH,
    })
    password!: string;

    @Column({ default: true })
    isActive!: boolean;
}
