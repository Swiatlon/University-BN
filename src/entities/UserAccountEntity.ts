import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { IUserAccount } from 'interfaces/IUserAccount';
import { Validation } from 'constants/validators/validatorsConstants';

@Entity('Users_Accounts')
export class UserAccount implements IUserAccount {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id!: string;

    @Column({ unique: true })
    @MinLength(Validation.LOGIN.MIN_LENGTH, { message: Validation.LOGIN.MIN_LENGTH_MESSAGE })
    @MaxLength(Validation.LOGIN.MAX_LENGTH, { message: Validation.LOGIN.MAX_LENGTH_MESSAGE })
    @IsString()
    @IsNotEmpty({ message: Validation.LOGIN.REQUIRED_MESSAGE })
    login!: string;

    @Column({ unique: true })
    @MinLength(Validation.EMAIL.MIN_LENGTH, { message: Validation.EMAIL.MIN_LENGTH_MESSAGE })
    @MaxLength(Validation.EMAIL.MAX_LENGTH, { message: Validation.EMAIL.MAX_LENGTH_MESSAGE })
    @IsEmail()
    @IsNotEmpty({ message: Validation.EMAIL.REQUIRED_MESSAGE })
    email!: string;

    @Column()
    @MinLength(Validation.PASSWORD.MIN_LENGTH, { message: Validation.PASSWORD.MIN_LENGTH_MESSAGE })
    @MaxLength(Validation.PASSWORD.MAX_LENGTH, { message: Validation.PASSWORD.MAX_LENGTH_MESSAGE })
    @IsString()
    @IsNotEmpty({ message: Validation.PASSWORD.REQUIRED_MESSAGE })
    password!: string;

    @Column({ default: true })
    @IsBoolean()
    isActive!: boolean;
}
