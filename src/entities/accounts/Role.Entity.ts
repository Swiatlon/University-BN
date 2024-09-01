import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccount } from './UserAccount.Entity';
import { IRoles } from 'types/Accounts/Accounts.Interfaces';

@Entity('Roles')
export class Role implements IRoles {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({
        nullable: false,
    })
    name!: string;

    @ManyToMany(() => UserAccount, (userAccount) => userAccount.roles)
    users: UserAccount[];
}
