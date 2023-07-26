import { Sequelize } from "sequelize";

const db = new Sequelize('machine_vision_db', 'user', 'user', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;