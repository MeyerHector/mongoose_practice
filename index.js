import express, { json } from "express";
import { dbConection } from './src/connections/db.js'
import { User } from "./src/models/user.js";
import { Person } from "./src/models/person.js";

const app = express()
const port = 5000

// middlewares
app.use(json())


dbConection()



//agregar una persona
app.post('/person', async (req, res) => {
    try {
        const person = new Person(req.body)
        await person.save()

        return res.json(person)
    } catch (error) {
        res.status(500).json('Internal server error')
        console.log(error)
    }

});

//registrar un usuario
app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()

        return res.json(user)
    } catch (error) {
        res.status(500).json('Internal server error')
    }

});

//traer todos los usuarios junto a la persona dueña(?)
app.get('/users', async (_req, res) => {
    try {
        const users = await User.find().populate('personId', 'name');
        return res.json({ data: users });
    } catch (error) {
        res.status(422).json("Error")
    }
});

app.listen(port, () => {
    console.log(`app listening in http://localhost:${port}`)
});