import { IsString } from 'class-validator';
import { ICreateAccountDto } from 'types/accounts/Accounts.Interfaces';

export class CreateUserAccountDto implements ICreateAccountDto {
    @IsString()
    identifier: string;

    @IsString()
    password: string;
}
