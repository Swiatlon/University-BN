import { AddressFactory } from 'factories/Persons/Address.Factory';
import { Address } from 'entities/Schemas/Address.Schema';

describe('AddressFactory', () => {
    let addressFactory: AddressFactory;

    beforeEach(() => {
        addressFactory = new AddressFactory();
    });

    it('should create an Address with valid data', () => {
        const address = addressFactory.create();

        expect(address).toBeInstanceOf(Address);
        expect(typeof address.country).toBe('string');
        expect(typeof address.city).toBe('string');
        expect(typeof address.postalCode).toBe('string');
        expect(typeof address.street).toBe('string');
        expect(typeof address.buildingNumber).toBe('string');
        expect(typeof address.apartmentNumber).toBe('string');
    });
});
