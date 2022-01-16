const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tasks_attachments', {
        // Model attributes are defined here
        attachment: {
            type: DataTypes.BLOB,
            allowNull: false
        },
    }, {
        // Other model options go here
        tableName: 'tasks_attachments' 
    });
};

