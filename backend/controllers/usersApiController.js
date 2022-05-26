const { User } = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const controller = {
    login: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (user) {
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    return res.json({
                        auth: false,
                        message: "Ocurrió un error, intente nuevamente",
                    });
                }
                let userToReturn = {
                    id: user.id,
                    email: user.email,
                };

                const token = jwt.sign(userToReturn, "secret-token", {
                    expiresIn: "1d",
                });
                return res.json({ auth: true, token, username: user.name });
                // res.status(200).send(userToReturn);
            } else {
                return res.json({
                    auth: false,
                    message: "Usuario o contraseña incorrectos",
                });
            }
        } catch (error) {
            return res.json({
                auth: false,
                message: "Ocurrió un error, intente nuevamente",
            });
        }
    },

    register: async (req, res) => {
        try {
            let userDB = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (userDB != null) {
                return res.json({
                    register: false,
                    message: "El usuario ya se encuentra registrado",
                });
            }

            // if (req.body.password != req.body.password2) {
            //     res.status(400);
            //     return res.send("Passwords do not match");
            // }

            await User.create({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
            });
            return res.json({ status: 200, register: true });
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },
};

module.exports = controller;
