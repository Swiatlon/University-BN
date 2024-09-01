import { Faker, faker } from '@faker-js/faker';
import { Address } from 'entities/Schemas/Address.Schema';
import { IAddressFactory } from 'types/Factories/Factory.Interfaces';
import { IAddress } from 'types/Persons/Persons/Persons.Interfaces';

export class AddressFactory implements IAddressFactory {
    private faker: Faker = faker;

    create(address: IAddress): Address {
        const newAddress = new Address();

        newAddress.country = address.country;
        newAddress.city = address.city;
        newAddress.postalCode = address.postalCode;
        newAddress.street = address.street;
        newAddress.buildingNumber = address.buildingNumber;
        newAddress.apartmentNumber = address.apartmentNumber;

        return newAddress;
    }

    createWithFakeData(): Address {
        const address = new Address();

        const buildingNumber = this.faker.location.buildingNumber();

        address.country = this.faker.location.country();
        address.city = this.faker.location.city();
        address.postalCode = this.faker.location.zipCode();
        address.street = this.faker.location.street();
        address.buildingNumber = buildingNumber;
        address.apartmentNumber = buildingNumber;

        return address;
    }
}
