import { Faker, faker } from '@faker-js/faker';
import { Address } from 'entities/Schemas/Address.Schema';
import { IAddressFactory } from 'types/Factories/Factories.Interfaces';

export class AddressFactory implements IAddressFactory {
    private faker: Faker = faker;

    create(): Address {
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
