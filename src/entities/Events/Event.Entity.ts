import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { EventOrganizer } from './EventOrganizer.Entity';
import { IEvent } from 'types/Events/Events.Interfaces';

@Entity('Events')
export class Event implements IEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;

    @Column({ type: 'text' })
    description: string;

    @ManyToMany(() => EventOrganizer, (eventOrganizer) => eventOrganizer.events, { onDelete: 'CASCADE', nullable: false })
    organizators: EventOrganizer[];
}
