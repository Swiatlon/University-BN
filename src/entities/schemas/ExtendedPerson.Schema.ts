import { Column } from 'typeorm';
import { BasicPerson } from './BasicPerson.Schema';
import { Validation } from 'constants/validators/validators.Constants';
import { IExtendedPersonSchema } from 'types/persons/persons/Persons.Interfaces';

export class ExtendedPerson extends BasicPerson implements IExtendedPersonSchema {
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
}
