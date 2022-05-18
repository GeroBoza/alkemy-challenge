"use strict";

module.exports = {
    async up(queryInterface, DataTypes, Sequelize) {
        return queryInterface.createTable("operation_categories", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable("operation_categories");
    },
};
