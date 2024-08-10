import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';
import { Gender, RolesEnum } from 'constants/entities/entities.Constants';
import { LoginUniquesService } from 'services/LoginUniques.Service';
import { hashPassword } from 'utils/Db/globalHelpers';
import { AdminAccount } from 'factories/Accounts/AccountModels/AdminAccount';
import { CustomUserAccount } from 'factories/Accounts/AccountModels/UserAccount';
import { StudentAccount } from 'factories/Accounts/AccountModels/StudentAccount';
import { EmployeeAccount } from 'factories/Accounts/AccountModels/EmployeeAccount';
import { Person } from 'entities/Schemas/Person.Schema';

jest.mock('services/LoginUniques.Service');
jest.mock('utils/Db/globalHelpers');

const createTestPerson = (): Person => ({
    id: '1',
    name: 'John',
    surname: 'Doe',
    dateOfBirth: new Date(),
    pesel: '12345678901',
    gender: Gender.FEMALE,
    nationality: 'American',
    contactEmail: 'john.doe@example.com',
    contactPhone: '1234567890',
    dateOfAdmission: '2023-01-01',
    accountId: '123',
});

describe('UserAccountFactory Integration Tests', () => {
    let userAccountFactory: UserAccountFactory;
    let mockHashPassword: jest.MockedFunction<typeof hashPassword>;

    beforeEach(() => {
        mockHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>;
        mockHashPassword.mockResolvedValue('hashedPassword');

        userAccountFactory = new UserAccountFactory();
    });

    it('should create an AdminAccount', async () => {
        const account = await userAccountFactory.createAccount(RolesEnum.ADMIN);

        expect(account).toBeInstanceOf(AdminAccount);
        expect(account.login).toBe('admin');
        expect(account.email).toBe('admin@example.com');
        expect(account.password).toBe('hashedPassword');
    });

    it('should create a CustomUserAccount', async () => {
        const account = await userAccountFactory.createAccount(RolesEnum.USER);

        expect(account).toBeInstanceOf(CustomUserAccount);
        expect(account.login).toBe('user');
        expect(account.email).toBe('user@example.com');
        expect(account.password).toBe('hashedPassword');
    });

    describe('Student and Employee Accounts', () => {
        let mockLoginUniquesService: jest.Mocked<LoginUniquesService>;

        beforeEach(() => {
            mockLoginUniquesService = new LoginUniquesService() as jest.Mocked<LoginUniquesService>;
            mockLoginUniquesService.generateUniqueLoginAndEmailBasedOnName.mockImplementation(async (name, surname) => ({
                login: `${name.toLowerCase()}.${surname.toLowerCase()}`,
                email: `${name.toLowerCase()}.${surname.toLowerCase()}@example.com`,
            }));

            userAccountFactory['loginUniquesService'] = mockLoginUniquesService;
        });

        it('should create a StudentAccount with unique login and email', async () => {
            const person = createTestPerson();

            const account = await userAccountFactory.createAccount(RolesEnum.STUDENT, person);

            expect(account).toBeInstanceOf(StudentAccount);
            expect(account.login).toBe('john.doe');
            expect(account.email).toBe('john.doe@example.com');
            expect(account.password).toBe('hashedPassword');
        });

        it('should create an EmployeeAccount with unique login and email', async () => {
            const person = createTestPerson();

            const account = await userAccountFactory.createAccount(RolesEnum.EMPLOYEE, person);

            expect(account).toBeInstanceOf(EmployeeAccount);
            expect(account.login).toBe('john.doe');
            expect(account.email).toBe('john.doe@example.com');
            expect(account.password).toBe('hashedPassword');
        });
    });

    it('should throw an error for an invalid role', async () => {
        await expect(userAccountFactory.createAccount('invalidRole' as RolesEnum)).rejects.toThrow('Invalid role!');
    });
});
