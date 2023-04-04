const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  database: 'insta_db1',
  username: 'yash_prajapati',
  password: 'leaQI9wrMVex3WnjAWfSI6IZrd13dOgS',
  host: 'dpg-cgm18qo7oslael6b2dug-a',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
  },
  define: {
    timestamps: false
  }
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize