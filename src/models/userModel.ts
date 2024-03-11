import {
  DataTypes,
  Model,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
} from "sequelize";
import sequelize from "../configs/database";
import Student from "../models/studentModel";

export class UserAccount extends Model {
  public id!: string;
  public login!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // These mixins are used for TypeScript to understand the methods added by Sequelize associations
  // public getStudent!: HasOneGetAssociationMixin<Student>;
  // public setStudent!: HasOneSetAssociationMixin<Student, string>;
}

UserAccount.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    login: {
      type: new DataTypes.STRING(16),
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 16],
      },
    },
    email: {
      type: new DataTypes.STRING(320),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "users_accounts",
    sequelize,
  }
);

// UserAccount.hasOne(Student, {
//   sourceKey: "id",
//   foreignKey: "accountId",
//   as: "student",
// });

export default UserAccount;
