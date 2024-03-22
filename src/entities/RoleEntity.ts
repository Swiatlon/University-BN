import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IRoles } from 'interfaces/IRoles';
import { UserAccount } from './UserAccountEntity';

@Entity('Roles')
export class Role implements IRoles {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        nullable: false,
    })
    name!: string;

    @ManyToMany(() => UserAccount, (userAccount) => userAccount.roles, {
        cascade: ['remove'],
    })
    users: UserAccount[];
}
