import Event, { associateEvent } from './Events';
import User, { associateUser } from './User';

const db = {
  User,
  Event,
};

associateUser(db);
associateEvent(db);

export default db;
