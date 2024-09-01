import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { EventOrganizer } from 'entities/Events/EventOrganizer.Entity';
import { ExternalParticipant } from 'entities/ExternalParticipants/ExternalParticipant.Entity';
import { IExternalParticipant } from 'types/Persons/ExternalParticipants/ExternalParticipants.Interfaces';

export interface ICompany {
    id: string;
    name: string;
    address: string;
    account: UserAccount;
    organizer?: EventOrganizer;
    externalParticipants?: ExternalParticipant[];
}

export interface ICompanyExternalVisitor {
    id: string;
    company: ICompany;
    externalParticipant: IExternalParticipant;
}
