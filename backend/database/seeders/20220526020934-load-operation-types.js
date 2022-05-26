"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("operation_types", [
            {
                name: "Ingresos",
            },
            {
                name: "Egresos",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("operation_types", null, {});
    },
};
