const { Sequelize,QueryTypes } = require('sequelize');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize("test_db", "sa",
    "Seebo19!!", {
        host: process.env.SQL_SERVER_ADDRESS || "localhost",
        port: "1433",
        dialect: "mssql",
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

const modelDefiners = [
    // Add all the models which are being used in this application.
    require('./model/todoModel'),
    require('./model/todoAttachments')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;