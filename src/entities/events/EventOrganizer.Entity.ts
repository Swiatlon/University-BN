import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { EventOrganizerTypeEnum } from 'constants/entities/entities.Constants';
import { Event } from 'entities/events/Event.Entity';
import { IEventOrganizer } from 'types/events/Events.Interfaces';

@Entity('Event_Organizers')
export class EventOrganizer implements IEventOrganizer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'enum',
        enum: EventOrganizerTypeEnum,
        name: 'organizer_type',
    })
    organizerType!: EventOrganizerTypeEnum;

    @ManyToMany(() => Event, (event) => event.organizators, { onDelete: 'CASCADE' })
    @JoinTable({
        name: 'Event_Organizer_Events',
        joinColumn: {
            name: 'event_organizer_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'event_id',
            referencedColumnName: 'id',
        },
    })
    events!: Event[];
}
