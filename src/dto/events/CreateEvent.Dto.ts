import { IsString, IsDate, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';
import { ICreateEventDto } from 'types/dto/Dto.Interfaces';

export class CreateEventDto implements ICreateEventDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @IsArray()
    organizators: EventOrganizer[];

    @IsString()
    author: EventOrganizer;
}
