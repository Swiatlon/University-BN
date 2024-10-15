import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { IUserAccount } from 'types/accounts/Accounts.Interfaces';
import { LoginUniquesService } from 'services/LoginUniques.Service';
import { IBasicPersonSchema } from 'types/persons/persons/Persons.Interfaces';

export class ExternalParticipantAccount extends UserAccount implements IUserAccount {
    private loginUniquesService: LoginUniquesService;

    constructor() {
        super();
        this.loginUniquesService = new LoginUniquesService();
        this.login = '';
        this.email = '';
        this.password = 'wiercik';
        this.isActive = true;
    }

    public static async create(person: IBasicPersonSchema): Promise<ExternalParticipantAccount> {
        const account = new ExternalParticipantAccount();
        await account.initializeLoginAndEmail(person);

        return account;
    }

    private async initializeLoginAndEmail(person: IBasicPersonSchema): Promise<void> {
        try {
            const companyLoginEmail = await new LoginUniquesService().generateUniqueLoginAndEmailBasedOnName(person.name, person.surname);
            this.login = companyLoginEmail.login;
            this.email = companyLoginEmail.email;
        } catch (error) {
            console.error('Failed to generate login and email for company:', error);
        }
    }
}
