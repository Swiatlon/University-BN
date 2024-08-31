import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Company } from 'entities/Companies/Company.Entity';
import { BasicPerson } from 'entities/Schemas/BasicPerson.Schema';
import { EventOrganizer } from 'entities/Events/EventOrganizer.Entity';

export interface IExternalParticipant extends BasicPerson {
    id: string;
    account: UserAccount;
    organizer?: EventOrganizer;
    companies?: Company[];
}
