import { IsString } from 'class-validator';
import { ICreateAccountDto } from 'interfaces/ICreateAccountDto';

export class CreateUserAccountDto implements ICreateAccountDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}
