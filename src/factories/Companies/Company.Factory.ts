import { Faker, faker } from '@faker-js/faker';
import { Company } from 'entities/Companies/Company.Entity';
import { ICompanyFactory } from 'types/Factories/Factory.Interfaces';
import { ICompany } from 'types/Companies/Companies.Interfaces';
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';
import { IExternalParticipant } from 'types/Persons/ExternalParticipants/ExternalParticipants.Interfaces';

export class CompanyFactory implements ICompanyFactory {
    private faker: Faker = faker;

    create(company: ICompany, account: IUserAccount, externalParticipants?: IExternalParticipant[]): Company {
        const newCompany = new Company();
        Object.assign(newCompany, company);

        newCompany.account = account;
        newCompany.externalParticipants = externalParticipants;

        return newCompany;
    }

    createWithFakeData(): Company {
        const newCompany = new Company();

        newCompany.name = this.faker.company.name();
        newCompany.address = this.faker.location.streetAddress();

        return newCompany;
    }
}
