import express from 'express';
//import jwt from 'express-jwt'
import jwtVerifyToken from './jwtVerify.js'
import { getContacts, getContactsById, getContactsByEmail, updateContacts } from './util/jsonHandler.js';
import { v4 as uuidv4 } from "uuid";
import { validateKeys, validateContactData } from './util/validateData.js';


const router = express.Router();

let contacts = [];
let keys = ["name", "email", "phoneNumber", "content"];

const validationCheck = (req, res, next) => {
    let newContact = { "id": uuidv4(), ...req.body };

    let errors = [];

    let err = validateKeys(keys, newContact);
    if (err.length > 0) errors.push(err);
    err = validateContactData(newContact);
    if (err.length > 0) errors.push(err);

    if (errors.length > 0) {
        return res.status(400).send({ "message": "validation error", "invalid": [`${errors}`] });
    }

    next();
}

router.get('/', (req, res, next) => res.send("Contacts world"));

router.get("/entries", jwtVerifyToken, (req, res, next) => {
    let user = req.user;
    console.log(user.email);
    try {
        getContactsByEmail(user.email).then((contacts) => {
            console.log(contacts);
            return res.status(200).send(contacts);

        })
    } catch (err) {
        console.error(err.message);
        next(err);
    }

});

router.get("/entries/:id", jwtVerifyToken, (req, res, next) => {
    let id = req.params.id;

    try {
        getContact(id).then((contacts) => {
            if (contacts == undefined || contacts.length == 0) {
                return res.status(404).send({ "message": `entry ${id} not found` });
            }
            return res.status(200).send(contacts);
        });
    } catch (err) {
        console.error(err.message)
        next(err)
    };

});

router.get('*', (req, res, next) => {
    res.status(404).send(`{"message": "not found"}`);

});


router.use(validationCheck);
router.post("/entries", (req, res, next) => {
    //    router.post("/entries", jwtVerifyToken, (req, res, next) => {
    let newContact = { "id": uuidv4(), ...req.body };
    console.log(newContact);
    try {
        getContacts().then((contacts) => {
            contacts.push(newContact);
            updateContacts(contacts);
            //return res.status(201).send({ contacts });
            return res.status(201).send(newContact);
        })
    } catch (err) {
        console.error(err.message)
        next(err)
    };

});

export default router;