const express = require('express'); //run local server
const axios = require('axios'); //remote rest-apis
const mongoose = require('mongoose'); //mongodb
const ejs = require('ejs'); //render client pages

//server constants
const app = express();
const port = 3000;

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//constants
const users = [];

//functions
function userExists(newUser){
    const found = users.find(
        (user) => user.name === newUser.name);
    if(found !== undefined)
        return true;
    return false
}

//routes
app.get('/', (req, res) => {
    res.json(users);
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.json(users[userId]);
})

app.patch('/user/:id/:symbol', (req, res) => {
    const userId = req.params.id;
    const stockSymbol = req.params.symbol;
    const found = users[userId].stockSymbols.find(symbol => stockSymbol === symbol )
    if (!found){
        users[userId].stockSymbols.push(stockSymbol);
        res.json({message: 'stock symbol was successfully added to your list'});
    }
    res.json({message: 'stock symbol was already in your list'});
});

app.post('/user/register', (req, res) => {
    const user = {
        name: req.body.name, 
        password: req.body.password,
        stockSymbols: []
    };

    if(userExists(user)){
        res.json({message: 'user already exists'});
    } else {
        users.push(user);
        res.json({message: 'new user created'});
    }
})

app.delete('/user/all', (req, res) => {
    users.splice(0, users.length);
    res.json({message: 'all users deleted'});
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

