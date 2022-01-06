const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('todo', {
        // Model attributes are defined here
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true
            // allowNull defaults to true
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            default: false
            // allowNull defaults to true
        },
        dueDate:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        // Other model options go here
        tableName: 'todo'
    });
};

