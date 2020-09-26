const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Joi = require('joi');

const bcrypt = require('bcrypt');

const users = [{username: "Matt", password: "wooo"}];

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));




app.get('/users', (req, res) => {
    res.send(users);
});



// Sign up
app.get('/users/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/userSignUp.html'));
});


app.post('/users/signup', async (req, res) => {
    const schema = Joi.object().keys({
        username: Joi.string().trim().min(5).max(20).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });
    Joi.validate(req.body, schema, (err, result) => {
        if (err){
            res.send('an error has occured');
            console.log(err);
        }
        console.log(result);
        res.send('succesffully posted data');

    });
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