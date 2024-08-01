import { AccountRepository } from 'repositories/Accounts/Accounts.Repository';
import { ILoginUniquesService } from 'types/Services/Services.Interfaces';

export class LoginUniquesService implements ILoginUniquesService {
    private generatedLogins: Set<string> = new Set();
    private generatedEmails: Set<string> = new Set();

    async generateUniqueLoginAndEmailBasedOnName(name: string, surname: string): Promise<{ login: string; email: string }> {
        let login = `${name}.${surname}`.toLowerCase();
        let email = `${name}.${surname}@example.com`.toLowerCase();
        let count = 1;

        while ((await this.loginExists(login)) || this.generatedLogins.has(login)) {
            login = `${name}.${surname}${count}`.toLowerCase();
            email = `${name}.${surname}${count}@example.com`.toLowerCase();
            count++;
        }

        this.generatedLogins.add(login);
        this.generatedEmails.add(email);

        return { login, email };
    }

    async loginExists(login: string): Promise<boolean> {
        return await AccountRepository().exists({
            where: { login },
        });
    }
}
