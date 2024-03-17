import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { Gender } from 'constants/general/generalConstants';
import { IPerson } from 'interfaces/IPerson';
import { Type } from 'class-transformer';
import { Validation } from 'constants/validators/validatorsConstants';

export abstract class Person implements IPerson {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id!: string;

    @Column()
    @MinLength(Validation.NAME.MIN_LENGTH, { message: Validation.NAME.MIN_LENGTH_MESSAGE })
    @MaxLength(Validation.NAME.MAX_LENGTH, { message: Validation.NAME.MAX_LENGTH_MESSAGE })
    @IsString()
    @IsNotEmpty({ message: Validation.NAME.REQUIRED_MESSAGE })
    name!: string;

    @Column()
    @MinLength(Validation.NAME.MIN_LENGTH, { message: Validation.NAME.MIN_LENGTH_MESSAGE })
    @MaxLength(Validation.NAME.MAX_LENGTH, { message: Validation.NAME.MAX_LENGTH_MESSAGE })
    @IsString()
    @IsNotEmpty({ message: Validation.NAME.REQUIRED_MESSAGE })
    surname!: string;

    @Column({
        name: 'date_of_birth',
    })
    @Type(() => Date)
    @IsDate()
    dateOfBirth!: Date;

    @Column({ unique: true })
    @MinLength(Validation.PESEL.LENGTH, { message: Validation.PESEL.LENGTH_MESSAGE })
    @MaxLength(Validation.PESEL.LENGTH, { message: Validation.PESEL.LENGTH_MESSAGE })
    @IsString()
    @IsNotEmpty({ message: Validation.PESEL.REQUIRED_MESSAGE })
    pesel!: string;

    @Column({})
    @IsEnum(Gender)
    gender!: Gender;
}
