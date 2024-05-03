import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IConsent } from 'interfaces/IConsent';

export class Consent implements IConsent {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        nullable: false,
    })
    permissionForPhoto!: boolean;

    @Column({
        nullable: false,
    })
    permissionForDataProcessing!: boolean;
}
