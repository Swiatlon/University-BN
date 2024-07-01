import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IRoles } from 'interfaces/Accounts/IAccounts';
import { UserAccount } from './UserAccount.Entity';

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
