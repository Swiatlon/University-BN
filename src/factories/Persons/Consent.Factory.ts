import { Faker, faker } from '@faker-js/faker';
import { Consent } from 'entities/Schemas/Consent.Schema';

export class ConsentFactory {
    private faker: Faker = faker;

    create(): Consent {
        const consent = new Consent();
        consent.permissionForDataProcessing = true;
        consent.permissionForPhoto = true;

        return consent;
    }
}
