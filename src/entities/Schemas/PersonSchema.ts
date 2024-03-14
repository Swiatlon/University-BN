import { PrimaryGeneratedColumn, Column } from "typeorm";

export interface IPerson {
  id: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
}

export abstract class Person implements IPerson {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 128,
  })
  name!: string;

  @Column({
    type: "varchar",
    length: 128,
  })
  surname!: string;

  @Column({
    type: "date",
    name: "date_of_birth",
  })
  dateOfBirth!: Date;
}
