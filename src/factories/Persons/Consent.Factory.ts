import { Faker, faker } from '@faker-js/faker';
import { Consent } from 'entities/Schemas/Consent.Schema';
import { IConsentFactory } from 'types/Factories/Factories.Interfaces';

export class ConsentFactory implements IConsentFactory {
    private faker: Faker = faker;

    create(): Consent {
        const consent = new Consent();
        consent.permissionForDataProcessing = true;
        consent.permissionForPhoto = true;

        return consent;
    }
}
