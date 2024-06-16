import { IsString } from 'class-validator';
import { ICreateAccountDto } from 'interfaces/Accounts/IAccounts';

export class CreateUserAccountDto implements ICreateAccountDto {
    @IsString()
    identifier: string;

    @IsString()
    password: string;
}
