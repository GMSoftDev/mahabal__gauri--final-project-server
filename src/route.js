import config from "dotenv";
import express from "express";
import users from "../data/users";
import { v4 as uuidv4 } from "uuid";
import verifyToken from "./middleware/jwtVerify";
import { readCats, writeCats } from './util/jsonHandler';

const router = express.Router();

let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


router.get("/", (req, res) => {
    return res.status(200).send("Hello World");
});


router.get("*", (req, res, next) => {
    let err = new Error("typed wrong URL");
    next(err);
});

export default router;