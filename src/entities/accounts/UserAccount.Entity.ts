import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Validation } from 'constants/validators/validators.Constants';
import { Role } from './Role.Entity';
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';

@Entity('Users_Accounts')
export class UserAccount implements IUserAccount {
    @PrimaryGeneratedColumn()
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
    deactivationDate?: Date;

    @ManyToMany(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
    @JoinTable({
        name: 'Users_Accounts_Roles',
        joinColumn: {
            name: 'users_accounts_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles: Role[];
}
