import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';
import { ExternalParticipant } from 'entities/externalParticipants/ExternalParticipant.Entity';
import { IExternalParticipant } from 'types/persons/externalParticipants/ExternalParticipants.Interfaces';

export interface ICompany {
    id: number;
    name: string;
    address: string;
    account: UserAccount;
    organizer?: EventOrganizer;
    externalParticipants?: ExternalParticipant[];
}

export interface ICompanyExternalVisitor {
    id: number;
    company: ICompany;
    externalParticipant: IExternalParticipant;
}
