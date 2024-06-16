import { Faker, faker } from '@faker-js/faker';
import { Address } from 'entities/Schemas/AddressSchema';

export class AddressFactory {
    private faker: Faker = faker;

    create(): Address {
        const address = new Address();

        const buildingNumber = faker.location.buildingNumber();

        address.country = faker.location.country();
        address.city = faker.location.city();
        address.postalCode = faker.location.zipCode();
        address.street = faker.location.street();
        address.buildingNumber = buildingNumber;
        address.apartmentNumber = buildingNumber;

        return address;
    }
}
