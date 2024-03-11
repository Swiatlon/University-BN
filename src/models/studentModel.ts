import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/database";
import { UserAccount } from "../models/userModel";

export class Student extends Model {
  public id!: string;
  public name!: string;
  public surname!: string;
  public dateOfBirth!: Date;
  public pesel!: string;
  public gender!: "men" | "women";
  public accountId!: string;
}

Student.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    surname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    pesel: {
      type: new DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.ENUM("men", "women"),
      allowNull: false,
    },
    // accountId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
  },
  {
    sequelize,
    tableName: "students",
  }
);

// Student.belongsTo(UserAccount, { foreignKey: "accountId", as: "userAccount" });

export default Student;
