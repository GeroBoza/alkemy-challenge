const jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    // console.log(req.headers);
    // console.log("token recibido", token);
    if (!token) {
        res.send("No hay token");
    } else {
        jwt.verify(token, "secret-token", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Error al loguearse" });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

module.exports = verifyJWT;
