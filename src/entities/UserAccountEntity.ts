import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserAccount } from 'interfaces/IUserAccount';
import { Validation } from 'constants/validators/validatorsConstants';
import { v4 as uuidv4 } from 'uuid';

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

    @Column({
        default: true,
        name: 'is_active',
    })
    isActive!: boolean;

    @Column({
        name: 'deactivation_date',
        nullable: true,
        default: null,
    })
    deactivationDate!: Date;

    @BeforeInsert()
    generateUUID() {
        this.id = uuidv4();
    }
}
