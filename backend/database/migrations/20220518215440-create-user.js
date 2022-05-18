"use strict";

module.exports = {
    up: (queryInterface, DataTypes, Sequelize) => {
        return queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("users");
    },
};
