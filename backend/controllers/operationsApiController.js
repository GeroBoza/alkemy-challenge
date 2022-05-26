const {
    Operation,
    Operation_type,
    Operation_category,
} = require("../database/models");

const controller = {
    getAllOperations: async (req, res) => {
        try {
            let userId = req.userId; //RECIBIR POR PARAM DESDE EL FRONT
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
    getOperation: async (req, res) => {
        try {
            let id = req.params.id;
            let userId = req.userId;

            let operation = await Operation.findByPk(id, {
                include: ["operation_type", "operation_category"],
            });

            if (!operation || operation.user_id !== userId) {
                return res.status(400).send({ status: 400, message: "Fail" });
            }

            res.json(operation);
        } catch (error) {
            res.send(error);
        }
    },
    getLastTenOperations: async (req, res) => {
        try {
            let userId = req.userId; //RECIBIR POR PARAM DESDE EL FRONT
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
        let userId = req.userId; //RECIBIR POR PARAM DESDE EL FRONT
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

    getOperationsByCategory: async (req, res) => {
        let id = req.params.id !== "null" ? req.params.id : null;
        let userId = req.userId; //RECIBIR POR PARAM DESDE EL FRONT
        try {
            let operations = await Operation.findAll({
                include: ["operation_type", "operation_category"],
                where: {
                    operation_category_id: id,
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

    getActualBalance: async (req, res) => {
        try {
            // req.userId se obtiene desde el verifyJWT donde se decodea el token
            let userId = req.userId;
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
            let userId = req.userId;
            let category =
                req.body.operation_category_id !== ""
                    ? req.body.operation_category_id
                    : null;
            // console.log(category);
            // return;

            Operation.create({
                concept: req.body.concept,
                amount: parseFloat(req.body.amount),
                date: req.body.date,
                user_id: userId,
                operation_category_id: category,
                operation_type_id: req.body.operation_type_id,
            });
            res.status(200).send({ message: "Operation created" });
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },

    editOperation: async (req, res) => {
        try {
            const opId = req.query.id;
            let category =
                req.body.operation_category_id !== ""
                    ? req.body.operation_category_id
                    : null;

            await Operation.update(
                {
                    concept: req.body.concept,
                    amount: parseFloat(req.body.amount),
                    date: req.body.date,
                    operation_category_id: category,
                },
                {
                    where: {
                        id: opId,
                    },
                }
            );
            res.status(200).send({ message: "Operation updated" });
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },

    deleteOperation: async (req, res) => {
        try {
            await Operation.destroy({
                where: {
                    id: req.body.id,
                },
            });
            res.status(200).send({ message: "Operation deleted" });
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },
};

module.exports = controller;
