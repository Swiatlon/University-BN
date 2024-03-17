import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from 'constants/general/generalConstants';
import { IPerson } from 'interfaces/IPerson';
import { Validation } from 'constants/validators/validatorsConstants';

export abstract class Person implements IPerson {
    @PrimaryGeneratedColumn('uuid')
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
}
