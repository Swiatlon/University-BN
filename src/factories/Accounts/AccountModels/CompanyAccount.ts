import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';
import { LoginUniquesService } from 'services/LoginUniques.Service';

export class CompanyAccount extends UserAccount implements IUserAccount {
    private constructor() {
        super();
        this.login = '';
        this.email = '';
        this.password = 'wiercik';
        this.isActive = true;
    }

    public static async create(companyName: string): Promise<CompanyAccount> {
        const account = new CompanyAccount();
        await account.initializeLoginAndEmail(companyName);

        return account;
    }

    private async initializeLoginAndEmail(companyName: string): Promise<void> {
        try {
            const companyLoginEmail = await new LoginUniquesService().generateUniqueLoginAndEmailBasedOnName(companyName, 'company');
            this.login = companyLoginEmail.login;
            this.email = companyLoginEmail.email;
        } catch (error) {
            console.error('Failed to generate login and email for company:', error);
        }
    }
}
