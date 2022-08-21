const DIALOGFLOW_API = require('./helper_function/dialogflow_api');
// external packages
const express = require('express');
const bodyParser = require('body-parser');
const { query } = require('express');
// Start the webapp
const webApp = express();

// Webapp settings
webApp.use(bodyParser.urlencoded({
    extended: true
}));
webApp.use(express.json());

// Server Port
const PORT = process.env.PORT || 5000;

// Home route
webApp.get('/', (req, res) => {
    res.send(`Hello World.!`);
});


// Website widget route
webApp.get('/website', async (req, res) => {
let text = req.query.text;
let sessionId=req.query.mysession;
    console.log("💛💛💛 data from server" ,text ,sessionId);

    let intentData = await DIALOGFLOW_API.detectIntent( text, sessionId);

    res.setHeader('Access-Control-Allow-Origin', '*');

    if (intentData) {
        res.send(intentData);
    } else {
        res.send('Chatbot is having problem. Try again after sometime.');
    }
});

// Start the server
webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});