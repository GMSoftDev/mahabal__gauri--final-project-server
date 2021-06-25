import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'
import { getUsers, getUser, getUserByName, existsUser, updateUsers } from './util/jsonHandler.js';
import { v4 as uuidv4 } from "uuid";
import { validateKeys, validateUserData } from './util/validateData.js'


const router = express.Router();

let users = [];
let keys = ["name", "email"];
let saltRounds = parseInt(process.env.saltRounds);

const validationCheck = (req, res, next) => {
    let newUser = { "id": uuidv4(), ...req.body };
    let errors = [];
    let err = validateKeys(keys, newUser);

    if (err.length > 0) errors.push(err);

    err = validateUserData(newUser);

    if (err.length > 0) errors.push(err);

    if (errors.length > 0) {
        return res.status(400).send({ "message": "validation error", "invalid": [`${errors}`] });
    }

    next();

}

router.post("/auth", (req, res, next) => {
    let loginUser = { ...req.body };

    if (!loginUser.email || !loginUser.password) {
        // return 401 error is username or password doesn't exist
        return res.status(401).send({ "message": "incorrect credentials provided" });
    }

    try {
        getUserByName(loginUser.email).then((user) => {
            if (user == undefined) {
                return res.status(401).send({ "message": "incorrect credentials provided" });
            }

            bcrypt.compare(loginUser.password, user.password, (err, match) => {

                if (err) {
                    next(err);
                }
                else {
                    if (match) {
                        let email = loginUser.email;
                        let token = jwt.sign({ email }, process.env.privateKey, { expiresIn: process.env.expirySeconds });
                        return res.status(201).send({ token });
                    }
                    else {
                        // password does not match the password in our records
                        return res.status(401).send({ "message": "incorrect credentials provided" });
                    }
                }
            });

        });
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

router.use(validationCheck);

router.post("/", (req, res, next) => {

    let newUser = { "id": uuidv4(), ...req.body };

    try {

        getUsers().then((users) => {

            bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
                // Store hash in your user DB.
                if (err) {
                    next(err);
                }
                else {
                    newUser.password = hash;
                    users.push(newUser);
                    updateUsers(users);
                    return res.status(201).send(users);
                }
            });

        });
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

export default router;