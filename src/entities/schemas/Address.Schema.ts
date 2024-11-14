import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IAddress } from 'types/persons/persons/Persons.Interfaces';

export class Address implements IAddress {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false,
    })
    country!: string;

    @Column({
        nullable: false,
    })
    city!: string;

    @Column({
        nullable: false,
        name: 'postal_code',
    })
    postalCode!: string;

    @Column({
        nullable: false,
    })
    street!: string;

    @Column({
        nullable: true,
        name: 'building_number',
    })
    buildingNumber!: string;

    @Column({
        nullable: true,
        name: 'apartment_number',
    })
    apartmentNumber!: string;
}
