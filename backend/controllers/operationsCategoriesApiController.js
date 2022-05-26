const { Operation_category } = require("../database/models");

const controller = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Operation_category.findAll({
                where: { user_id: req.userId },
            });
            res.json(categories);
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },

    newCategory: async (req, res) => {
        try {
            Operation_category.create({
                name: req.body.name,
                user_id: req.userId,
            });
            res.status(200).send({ message: "Operation category created" });
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },
};

module.exports = controller;
