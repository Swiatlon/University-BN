import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IConsent } from 'types/persons/persons/Persons.Interfaces';

export class Consent implements IConsent {
    @PrimaryGeneratedColumn()
    id!: number;

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
