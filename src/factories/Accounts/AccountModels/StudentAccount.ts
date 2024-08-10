import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';
import { LoginUniquesService } from 'services/LoginUniques.Service';
import { IExtendedPersonSchema } from 'types/Persons/Persons/Persons.Interfaces';

export class StudentAccount extends UserAccount implements IUserAccount {
    private loginUniquesService: LoginUniquesService;

    private constructor() {
        super();
        this.loginUniquesService = new LoginUniquesService();
        this.login = '';
        this.email = '';
        this.password = 'wiercik';
        this.isActive = true;
    }

    public static async create(person: IExtendedPersonSchema): Promise<StudentAccount> {
        const account = new StudentAccount();
        await account.initializeLoginAndEmail(person);

        return account;
    }

    private async initializeLoginAndEmail(person: IExtendedPersonSchema): Promise<void> {
        try {
            const studentLoginEmail = await this.loginUniquesService.generateUniqueLoginAndEmailBasedOnName(person.name, person.surname);
            this.login = studentLoginEmail.login;
            this.email = studentLoginEmail.email;
        } catch (error) {
            console.error('Failed to generate login and email for student:', error);
        }
    }
}
