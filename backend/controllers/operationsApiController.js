const {
    Operation,
    Operation_type,
    Operation_category,
} = require("../database/models");

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

            let operationsJSON = [];
            operations.forEach((operation) => {
                let newOperation = {
                    id: operation.id,
                    concept: operation.concept,
                    amount: operation.amount,
                    date: operation.date,
                    operation_type:
                        operation.operation_type !== null
                            ? operation.operation_type.name
                            : "Sin tipo",
                    operation_category:
                        operation.operation_category !== null
                            ? operation.operation_category.name
                            : "Sin categoría",
                };

                operationsJSON.push(newOperation);
            });
            res.json(operationsJSON);
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
            let operationsJSON = [];
            operations.forEach((operation) => {
                let newOperation = {
                    id: operation.id,
                    concept: operation.concept,
                    amount: operation.amount,
                    date: operation.date,
                    operation_type:
                        operation.operation_type !== null
                            ? operation.operation_type.name
                            : "Sin tipo",
                    operation_category:
                        operation.operation_category !== null
                            ? operation.operation_category.name
                            : "Sin categoría",
                };

                operationsJSON.push(newOperation);
            });
            res.json(operationsJSON);
        } catch (error) {
            res.send(error);
        }
    },

    // getOperationsByCategory: async (req, res) => {
    //     let id = req.params.id;
    //     let userId = 1; //RECIBIR POR PARAM DESDE EL FRONT
    //     try {
    //         let operations = await Operation.findAll({
    //             include: ["operation_type", "operation_category"],
    //             where: {
    //                 operation_category_id: id,
    //                 user_id: userId,
    //             },
    //         });
    //         let operationsJSON = [];
    //         operations.forEach((operation) => {
    //             let newOperation = {
    //                 id: operation.id,
    //                 concept: operation.concept,
    //                 amount: operation.amount,
    //                 date: operation.date,
    //                 operation_type:
    //                     operation.operation_type !== null
    //                         ? operation.operation_type.name
    //                         : "Sin tipo",
    //                 operation_category:
    //                     operation.operation_category !== null
    //                         ? operation.operation_category.name
    //                         : "Sin categoría",
    //             };

    //             operationsJSON.push(newOperation);
    //         });
    //         res.json(operationsJSON);
    //     } catch (error) {
    //         res.send(error);
    //     }
    // },

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

    getOperationsTypes: async (req, res) => {
        try {
            const operationsTypes = await Operation_type.findAll();
            res.json(operationsTypes);
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },

    newOperation: async (req, res) => {
        try {
            let category =
                req.body.operation_category_id !== ""
                    ? req.body.operation_category_id
                    : null;

            Operation.create({
                concept: req.body.concept,
                amount: parseFloat(req.body.amount),
                date: req.body.date,
                user_id: req.body.user_id,
                operation_category_id: category,
                operation_type_id: req.body.operation_type_id,
            });
            res.status(200).send({ message: "Operation created" });
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },
};

module.exports = controller;
