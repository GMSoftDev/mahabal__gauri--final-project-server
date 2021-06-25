//import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

//dotenv.config();

export default (req, res, next) => {
    const authHeader = req.headers["authorization"];
    // Value of the authorization header is typically: "Bearer JWT", hence splitting with empty space and getting second part of the split
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(403).send({ message: "token not provided" });
    }
    try {
        const data = jwt.verify(token, process.env.privatekey)
        /*         , function (err, decoded) {
                    if (err) {
                        return res.status(401).send({ message: err.message });
                    }
                }); */
        //console.log(data);
        req.user = data;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).send({ message: err.message });
    }
};