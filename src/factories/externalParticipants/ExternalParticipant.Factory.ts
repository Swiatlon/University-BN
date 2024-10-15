import { ExternalParticipant } from 'entities/externalParticipants/ExternalParticipant.Entity';
import { BasicPerson } from 'entities/schemas/BasicPerson.Schema';
import { BasicPersonFactory } from 'factories/persons/BasicPerson.Factory';
import { IUserAccount } from 'types/accounts/Accounts.Interfaces';
import { ICompany } from 'types/companies/Companies.Interfaces';
import { IExternalParticipantFactory } from 'types/factories/Factory.Interfaces';

export class ExternalParticipantFactory implements IExternalParticipantFactory {
    private basicPersonFactory: BasicPersonFactory;

    constructor() {
        this.basicPersonFactory = new BasicPersonFactory();
    }

    create(person: BasicPerson, account: IUserAccount, companies?: ICompany[]): ExternalParticipant {
        const externalParticipant = new ExternalParticipant();
        Object.assign(externalParticipant, person);

        externalParticipant.account = account;
        externalParticipant.companies = companies ?? [];

        return externalParticipant;
    }

    createWithFakeData(): ExternalParticipant {
        const externalParticipant = new ExternalParticipant();
        Object.assign(externalParticipant, this.basicPersonFactory.createWithFakeData());

        return externalParticipant;
    }
}
