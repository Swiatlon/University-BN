import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IUserAccount {
    id: string;
    login: string;
    email: string;
    password: string;
    isActive: boolean;
}

@Entity('Users_Accounts')
export class UserAccount implements IUserAccount {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        length: 32,
        unique: true,
    })
    login: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    password: string;

    @Column({
        type: 'boolean',
        default: true,
    })
    isActive: boolean;
}

export default UserAccount;
