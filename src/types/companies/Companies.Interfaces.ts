import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';
import { ExternalParticipant } from 'entities/externalParticipants/ExternalParticipant.Entity';
import { IExternalParticipant } from 'types/persons/externalParticipants/ExternalParticipants.Interfaces';

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
