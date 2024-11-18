import { IsString } from 'class-validator';
import { IAccountCredentials } from 'types/accounts/Accounts.Interfaces';

export class AccountCredentialsDto implements IAccountCredentials {
    @IsString()
    identifier: string;

    @IsString()
    password: string;
}
