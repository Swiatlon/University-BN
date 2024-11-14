import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccount } from './UserAccount.Entity';
import { IRoles } from 'types/accounts/Accounts.Interfaces';

@Entity('Roles')
export class Role implements IRoles {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false,
        unique: true,
    })
    name!: string;

    @ManyToMany(() => UserAccount, (userAccount) => userAccount.roles)
    users: UserAccount[];
}
