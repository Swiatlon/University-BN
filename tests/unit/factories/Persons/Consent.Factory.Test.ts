import { Consent } from 'entities/Schemas/Consent.Schema';
import { ConsentFactory } from 'factories/Persons/Consent.Factory';

describe('ConsentFactory', () => {
    let consentFactory: ConsentFactory;

    beforeEach(() => {
        consentFactory = new ConsentFactory();
    });

    it('should create a Consent with default permissions', () => {
        const consent = consentFactory.create();

        expect(consent).toBeInstanceOf(Consent);
        expect(consent.permissionForDataProcessing).toBe(true);
        expect(consent.permissionForPhoto).toBe(true);
    });
});
