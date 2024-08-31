import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { EventOrganizer } from './EventOrganizer.Entity';
import { IEvent } from 'types/Events/Events.Interfaces';

@Entity('Events')
export class Event implements IEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'timestamp' })
    startDate: Date;

    @Column({ type: 'timestamp' })
    endDate: Date;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(() => EventOrganizer, { nullable: false })
    @JoinColumn({ name: 'author_id' })
    author: EventOrganizer;

    @ManyToMany(() => EventOrganizer, (eventOrganizer) => eventOrganizer.events, { onDelete: 'CASCADE', nullable: false })
    organizators: EventOrganizer[];
}
