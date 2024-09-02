import { Faker, faker } from '@faker-js/faker';
import { Consent } from 'entities/schemas/Consent.Schema';
import { IConsentFactory } from 'types/factories/Factory.Interfaces';
import { IConsent } from 'types/persons/persons/Persons.Interfaces';

export class ConsentFactory implements IConsentFactory {
    private faker: Faker = faker;

    create(consent: IConsent): Consent {
        const newConsent = new Consent();
        newConsent.permissionForDataProcessing = consent.permissionForDataProcessing;
        newConsent.permissionForPhoto = consent.permissionForPhoto;

        return consent;
    }

    createWithFakeData(): Consent {
        const consent = new Consent();
        consent.permissionForDataProcessing = this.faker.helpers.arrayElement([true, false]);
        consent.permissionForPhoto = this.faker.helpers.arrayElement([true, false]);

        return consent;
    }
}
