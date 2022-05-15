// const bcrypt = require("bcrypt");

const { User } = require("../database/models");

const controller = {
    login: async (req, res) => {
        try {
            let errors = validationResult(req);

            if (errors.isEmpty()) {
                let user = await User.findOne({
                    where: { email: req.body.email },
                });
                if (user != undefined) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        var userToLogIn = user;
                    } else {
                        res.status(400);
                        return res.send("Invalid password");
                    }
                } else {
                    res.status(400);
                    return res.send("Invalid email");
                }
                // req.session.loggedUser = userToLogIn;
                // if (req.body.remember != undefined) {
                //     res.cookie("remember", userToLogIn.email, {
                //         maxAge: 3600000,
                //     });
                // }
                // res.redirect("/");
                return res.status(200);
            } else {
                return res.status(400);
            }
        } catch (errors) {
            res.send(errors);
        }
    },

    register: async (req, res) => {
        try {
            const errors = validationResult(req);

            let userDB = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (userDB != null) {
                res.status(400);
                return res.send("User exists");
            }

            if (req.body.password != req.body.password2) {
                res.status(400);
                return res.send("Passwords do not match");
            }

            if (errors.isEmpty()) {
                await User.create({
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                });
                return res.status(200);
            } else {
                return res.status(400);
            }
        } catch (error) {
            res.send(error);
        }
    },
};

module.exports = controller;
