import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public picture!: string;
}

User.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    picture: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "user" }
);

export default User;
