import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IConsent } from 'types/Persons/Persons/Persons.Interfaces';

export class Consent implements IConsent {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({
        nullable: false,
        name: 'permission_for_photo',
    })
    permissionForPhoto!: boolean;

    @Column({
        name: 'permission_for_data_processing',
        nullable: false,
    })
    permissionForDataProcessing!: boolean;
}
