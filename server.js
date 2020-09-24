const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const bcrypt = require('bcrypt');

const users = [{username: "Matt", password: "wooo"}];

//middleware
app.use(cors());
app.use(bodyParser.json());


app.get('/users', (req, res) => {
    res.send(users);
});



// Sign up
// app.get('/users/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, 'userSignUp.html'));
// });


app.post('/users/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = {username: req.body.username, email: req.body.email ,password: hashedPassword};
        users.push(user);
        res.status(201).send();
    } catch (err) {
        res.send(err);
    }
    
    
});

app.post('/users/login', async (req, res) => {
    const userFound = users.find(user => user.username === req.body.username );
    if (userFound == undefined) {
        res.status(400).send('User not found');
    }
    try {
        
        if (await bcrypt.compare(req.body.password, userFound.password)){
            res.send('Success');
        }
        else {
            res.send('Fail');
        }
    } catch {
        res.status(500).send();
    }
});



app.listen(5000);