import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

enum Gender {
  Men = "men",
  Women = "women",
}

@Entity()
@Unique(["pesel"])
export class Student {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 128 })
  name!: string;

  @Column({ type: "varchar", length: 122 })
  surname!: string;

  @Column({ type: "date" })
  dateOfBirth!: Date;

  @Column({ type: "char", length: 11 })
  pesel!: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.Men,
  })
  gender!: Gender;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default Student;
