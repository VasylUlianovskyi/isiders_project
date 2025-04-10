import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './User';

interface EventAttributes {
  id: number;
  name: string;
  date: Date;
  reminder: number;
  description: string;
  importance: string;
  status: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  public id!: number;
  public name!: string;
  public date!: Date;
  public reminder!: number;
  public description!: string;
  public importance!: string;
  public status!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reminder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    importance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: true,
  }
);

export const associateEvent = (models: { User: typeof User }) => {
  Event.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });
};

export default Event;
