const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tasks', {
        // Model attributes are defined here
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        dueDate:{
            type: DataTypes.STRING,
            allowNull: true
        },
        attachment_id:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        // Other model options go here
        tableName: 'tasks'
    });
};

