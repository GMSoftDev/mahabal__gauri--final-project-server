import dotenv from 'dotenv';
import express from 'express'
import routeContacts from './src/contacts.js'
import routeUsers from './src/users.js'
import cors from 'cors';

const app = express();

dotenv.config();
const port = process.env.PORT;
console.log(`Your port is ${process.env.PORT}`); // undefined
app.use(express.json());
app.use(cors())
app.use('/contact_form', routeContacts);
app.use('/users', routeUsers);
app.use('*', (req, res, next) => {
    res.status(404).send(`{"message": "not found"}`);

});
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(404).send(`{"message": "not found"}`);
});


app.listen(port, () => {
    console.log(`API server ready on http://localhost:${port}.`);
});


export default app