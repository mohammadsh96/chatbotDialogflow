// const dialogflow = require('@google-cloud/dialogflow');
// const fs = require('fs');
const dialogflow = require('dialogflow');
// const CREDENTIALS = JSON.parse(fs.readFileSync('./cosmic-palace-356618-63dac3069f69DialogflowtestAgent.json', 'utf-8'));
const CREDENTIALS =require('../devKey.js')
// const CREDENTIALS =require('../../backend/devKey.js')

const PRIVATE_KEY  =CREDENTIALS.private_key;
const PROJECID = CREDENTIALS.project_id;
const Client_email = CREDENTIALS.client_email;
const SESSIONID= CREDENTIALS.sessionId;
const SESSIONLANGUAGE=CREDENTIALS.sessionLanguage;

const credentials = {
    
        private_key: PRIVATE_KEY ,
        client_email: Client_email
    
}
//this will  create new session from the credantial 
const sessionClient = new dialogflow.SessionsClient({PROJECID,credentials});
const detectIntent = async (userText, userId) => {

    let sessionPath = await sessionClient.sessionPath(PROJECID, SESSIONID+userId);
console.log("dialogflow >>> session path " ,sessionPath);

//this request will do the detectIntent 
    let request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userText,
                languageCode: SESSIONLANGUAGE,
            },
        },
    };
    console.log("💚💚request" ,request);
    try {
        const responses = await sessionClient.detectIntent(request);
         console.log("this is the response 💛💚💙❤💔💔",responses); 
          //after received the response   we will pick what we want as a result
        const result = {
text:responses[0].queryResult.fulfillmentMessages[0].text.text[0],
querytext:responses[0].queryResult.queryText,
// name:responses[0].queryResult.parameters.fields.person.structValue.fields.name.stringValue,
// chatres:responses[0].queryResult.parameters.fields.chatres.stringValue,
displayName:responses[0].queryResult.intent.displayName,
fullfillmentText:responses[0].queryResult.fulfillmentText
        }
         console.log(result); 
        return (result) //this will send the result to front end 
    } catch (error) {
        console.log(`Error at dialogflow-api.js detectIntent --> ${error}`);
        return {
            status: 0,
            text: 'Hello , How Can I Help You ? '
        };
    }
};

module.exports = {
    detectIntent
};