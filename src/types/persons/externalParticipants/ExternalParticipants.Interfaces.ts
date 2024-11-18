import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { Company } from 'entities/companies/Company.Entity';
import { BasicPerson } from 'entities/schemas/BasicPerson.Schema';
import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';

export interface IExternalParticipant extends BasicPerson {
    id: number;
    account: UserAccount;
    organizer?: EventOrganizer;
    companies?: Company[];
}
