import { IsDate, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Gender } from 'constants/entities/entities.Constants';
import { Type } from 'class-transformer';
import { Validation } from 'constants/validators/validators.Constants';
import { IDtoPerson } from 'interfaces/Persons/IPersons';

export abstract class CreatePersonDto implements IDtoPerson {
    @IsString()
    @MinLength(Validation.NAME.MIN_LENGTH, { message: Validation.NAME.MIN_LENGTH_MESSAGE })
    @MaxLength(Validation.NAME.MAX_LENGTH, { message: Validation.NAME.MAX_LENGTH_MESSAGE })
    @IsNotEmpty({ message: Validation.NAME.REQUIRED_MESSAGE })
    name: string;

    @IsString()
    @MinLength(Validation.NAME.MIN_LENGTH, { message: Validation.NAME.MIN_LENGTH_MESSAGE })
    @MaxLength(Validation.NAME.MAX_LENGTH, { message: Validation.NAME.MAX_LENGTH_MESSAGE })
    @IsNotEmpty({ message: Validation.NAME.REQUIRED_MESSAGE })
    surname: string;

    @Type(() => Date)
    @IsDate()
    dateOfBirth: Date;

    @IsString()
    @MinLength(Validation.PESEL.LENGTH, { message: Validation.PESEL.LENGTH_MESSAGE })
    @MaxLength(Validation.PESEL.LENGTH, { message: Validation.PESEL.LENGTH_MESSAGE })
    @IsNotEmpty({ message: Validation.PESEL.REQUIRED_MESSAGE })
    pesel: string;

    @IsEnum(Gender)
    gender: Gender;

    @IsString()
    @MaxLength(Validation.NAME.MAX_LENGTH, { message: Validation.NAME.MAX_LENGTH_MESSAGE })
    nationality: string;
}
