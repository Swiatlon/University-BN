import { Column } from 'typeorm';
import { GenderEnum } from 'constants/entities/entities.Constants';
import { Validation } from 'constants/validators/validators.Constants';
import { IBasicPersonSchema } from 'types/persons/persons/Persons.Interfaces';

export class BasicPerson implements IBasicPersonSchema {
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
        type: 'enum',
        enum: GenderEnum,
    })
    gender!: GenderEnum;

    @Column({
        nullable: true,
    })
    nationality?: string;

    @Column({
        nullable: true,
        name: 'contact_email',
    })
    contactEmail?: string;

    @Column({
        nullable: true,
        name: 'contact_phone',
    })
    contactPhone?: string;
}
