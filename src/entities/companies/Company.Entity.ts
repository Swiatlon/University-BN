import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';
import { ExternalParticipant } from 'entities/externalParticipants/ExternalParticipant.Entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { ICompany } from 'types/companies/Companies.Interfaces';

@Entity('Companies')
export class Company implements ICompany {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({
        nullable: false,
        unique: true,
    })
    name!: string;

    @Column({
        nullable: false,
    })
    address!: string;

    @ManyToOne(() => UserAccount, { nullable: false })
    @JoinColumn({ name: 'account_id' })
    account!: UserAccount;

    @ManyToOne(() => EventOrganizer, { cascade: true, nullable: true })
    @JoinColumn({
        name: 'organizer_id',
    })
    organizer?: EventOrganizer;

    @ManyToMany(() => ExternalParticipant, (externalParticipant) => externalParticipant.companies)
    externalParticipants?: ExternalParticipant[];
}
