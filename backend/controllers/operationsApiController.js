const { Operation } = require("../database/models");

const controller = {
    getAllOperations: async (req, res) => {
        try {
            let userId = 1; //RECIBIR POR PARAM DESDE EL FRONT
            let operations = await Operation.findAll({
                where: {
                    user_id: userId,
                },
                order: ["id"],
                include: ["operation_type", "operation_category"],
            });
            res.json(operations);
        } catch (error) {
            res.send(error);
        }
    },
    getLastTenOperations: async (req, res) => {
        try {
            let userId = 1; //RECIBIR POR PARAM DESDE EL FRONT
            let operations = await Operation.findAll({
                where: {
                    user_id: userId,
                },
                order: [["date", "DESC"]],
                include: ["operation_type", "operation_category"],
                limit: 10,
            });
            res.json(operations);
        } catch (error) {
            res.send(error);
        }
    },
    getOperationsByType: async (req, res) => {
        let id = req.params.id;
        let userId = 1; //RECIBIR POR PARAM DESDE EL FRONT
        try {
            let operations = await Operation.findAll({
                include: ["operation_type", "operation_category"],
                where: {
                    operation_type_id: id,
                    user_id: userId,
                },
            });
            res.json(operations);
        } catch (error) {
            res.send(error);
        }
    },

    getActualBalance: async (req, res) => {
        try {
            let userId = 1; //RECIBIR POR PARAM DESDE EL FRONT
            let incomesOperations = await Operation.findAll({
                where: {
                    operation_type_id: 1,
                    user_id: userId,
                },
            });
            let expensesOperations = await Operation.findAll({
                where: {
                    operation_type_id: 2,
                    user_id: userId,
                },
            });

            let incomes = 0;
            let expenses = 0;
            incomesOperations.forEach((incomeOperation) => {
                incomes += parseFloat(incomeOperation.amount);
            });
            expensesOperations.forEach((expenseOperation) => {
                expenses += parseFloat(expenseOperation.amount);
            });

            let balance = incomes - expenses;

            res.status(200);
            return res.json(balance.toFixed(2));
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },
};

module.exports = controller;
