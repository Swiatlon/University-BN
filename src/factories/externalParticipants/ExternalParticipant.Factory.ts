import { ExternalParticipant } from 'entities/ExternalParticipants/ExternalParticipant.Entity';
import { BasicPerson } from 'entities/Schemas/BasicPerson.Schema';
import { BasicPersonFactory } from 'factories/Persons/BasicPerson.Factory';
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';
import { ICompany } from 'types/Companies/Companies.Interfaces';
import { IExternalParticipantFactory } from 'types/Factories/Factory.Interfaces';

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
