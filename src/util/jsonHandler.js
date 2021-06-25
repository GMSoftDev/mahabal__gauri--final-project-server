// None of these need to be npm installed as they come with Node.js.
import dotenv from 'dotenv'
import util from 'util';
import { promises as fs } from 'fs';
import path from 'path';

dotenv.config();

// Defines the path for the database file `users.json`.
const usersDB = path.resolve(process.env.usersDbPath);

// Defines the path for the database file `contacts.json`.
const contactsDB = path.resolve(process.env.contactsDbPath);

async function getUsers() {
    // try {
    let json = await fs.readFile(usersDB);

    return JSON.parse(json);
    // } catch (e) {
    //     throw e;
    // }
}

async function getUser(id) {
    let users = [];

    //try {
    users = await getUsers();
    let foundUser = users.find(user => { return user.id === id; });
    return foundUser;
    // } catch (e) {
    //     throw e;
    // }
}

async function getUserByName(email) {
    let users = [];

    //try {
    users = await getUsers();
    let foundUser = users.find(user => { return user.email === email });
    return foundUser;
    // } catch (e) {
    //     throw e;
    // }
}

async function existsUser(email, password) {

    let users = [];
    //try {
    users = await getUsers();
    let foundUser = users.find(user => { return (user.email === email && user.password === password); });
    let found = foundUser === undefined ? false : true;
    return found;
    // } catch (e) {
    //     throw e;
    // }
}

async function updateUsers(users) {

    //try {
    let json = JSON.stringify(users, null, 2);
    return fs.writeFile(usersDB, json);
    // } catch (e) {
    //     throw e;
    // }
}

async function getContacts() {
    //try {
    const json = await fs.readFile(contactsDB);
    return JSON.parse(json);
    // } catch (e) {
    //     throw e;
    // }
}

async function getContactsById(id) {
    let contacts = [];
    //try {
    contacts = await getContacts();
    let foundContact = contacts.filter(contact => { return contact.id === id; });
    return foundContact;
    // } catch (e) {
    //     throw e;
    // }
}

async function getContactsByEmail(email) {
    let contacts = [];
    //try {
    contacts = await getContacts();
    let foundContact = contacts.filter(contact => { return contact.email === email; });
    return foundContact;
    // } catch (e) {
    //     throw e;
    // }
}

async function updateContacts(contacts) {
    //try {
    const json = JSON.stringify(contacts, null, 2);
    return fs.writeFile(contactsDB, json);
    // } catch (e) {
    //     throw e;
    // }
}

export { getUsers, getUser, getUserByName, existsUser, updateUsers, getContacts, getContactsById, getContactsByEmail, updateContacts };
