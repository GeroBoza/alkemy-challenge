"use strict";

module.exports = {
    async up(queryInterface, DataTypes, Sequelize) {
        return queryInterface.createTable("operations", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            concept: {
                type: DataTypes.STRING,
            },
            amount: {
                type: DataTypes.DECIMAL(10, 2),
            },
            date: {
                type: DataTypes.DATEONLY,
            },

            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: "users",
                        // schema: "schema",
                    },
                    key: "id",
                },
                allowNull: false,
            },
            operation_category_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: "operation_categories",
                        // schema: "schema",
                    },
                    key: "id",
                },
                allowNull: false,
            },
            operation_type_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: "operation_types",
                        // schema: "schema",
                    },
                    key: "id",
                },
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable("opreations");
    },
};
