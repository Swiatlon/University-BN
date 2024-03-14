import { Entity, Column, OneToOne, JoinColumn, ChildEntity } from "typeorm";
import UserAccount from "./userAccountEntity";
import { Person } from "./Schemas/PersonSchema";

export enum Gender {
  Men = "men",
  Women = "women",
}

export interface IStudent {
  pesel: string;
  gender: Gender;
  accountId: UserAccount;
}

@Entity("Students")
export class Student extends Person implements IStudent {
  @Column({
    type: "char",
    length: 11,
    unique: true,
  })
  pesel!: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.Men,
  })
  gender!: Gender;

  @OneToOne(() => UserAccount)
  @JoinColumn({ name: "account_id" })
  accountId!: UserAccount;
}
