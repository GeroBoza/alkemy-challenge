const { Operation_type } = require("../database/models");

const controller = {
    getAllTypes: async (req, res) => {
        try {
            const types = await Operation_type.findAll();
            res.json(types);
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },
};

module.exports = controller;
