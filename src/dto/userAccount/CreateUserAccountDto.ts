import { IsString } from 'class-validator';
import { ICreateAccountDto } from 'interfaces/ICreateAccountDto';

export class CreateUserAccountDto implements ICreateAccountDto {
    @IsString()
    identifier: string;

    @IsString()
    password: string;
}
