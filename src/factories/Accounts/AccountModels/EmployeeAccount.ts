import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';
import { LoginUniquesService } from 'services/LoginUniques.Service';
import { IExtendedPersonSchema } from 'types/Persons/Persons/Persons.Interfaces';

export class EmployeeAccount extends UserAccount implements IUserAccount {
    private loginUniquesService: LoginUniquesService;

    private constructor() {
        super();
        this.loginUniquesService = new LoginUniquesService();
        this.login = '';
        this.email = '';
        this.password = 'wiercik';
        this.isActive = true;
    }

    public static async create(person: IExtendedPersonSchema): Promise<EmployeeAccount> {
        const account = new EmployeeAccount();
        await account.initializeLoginAndEmail(person);
        return account;
    }

    private async initializeLoginAndEmail(person: IExtendedPersonSchema): Promise<void> {
        try {
            const employeeLoginEmail = await this.loginUniquesService.generateUniqueLoginAndEmailBasedOnName(person.name, person.surname);
            this.login = employeeLoginEmail.login;
            this.email = employeeLoginEmail.email;
        } catch (error) {
            console.error('Failed to generate login and email for employee:', error);
        }
    }
}
