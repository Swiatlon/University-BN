import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Validation } from 'constants/validators/validators.Constants';
import { IPerson } from 'types/Persons/Persons/Persons.Interfaces';

export class Person implements IPerson {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({
        nullable: false,
        length: Validation.NAME.MAX_LENGTH,
    })
    name!: string;

    @Column({
        nullable: false,
        length: Validation.NAME.MAX_LENGTH,
    })
    surname!: string;

    @Column({
        name: 'date_of_birth',
    })
    dateOfBirth!: Date;

    @Column({
        unique: true,
        nullable: false,
        length: Validation.PESEL.LENGTH,
    })
    pesel!: string;

    @Column({
        type: 'enum',
        enum: Gender,
    })
    gender!: Gender;

    @Column({
        nullable: false,
    })
    nationality!: string;

    @Column({
        nullable: false,
        name: 'contact_email',
    })
    contactEmail!: string;

    @Column({
        nullable: false,
        name: 'contact_phone',
    })
    contactPhone!: string;

    @Column({
        nullable: false,
        name: 'date_of_admission',
    })
    dateOfAdmission!: string;

    @OneToOne(() => UserAccount, { cascade: true, nullable: true })
    @JoinColumn({
        name: 'account_id',
    })
    accountId: string;
}
