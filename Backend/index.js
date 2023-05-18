const express = require("express");
require('dotenv').config();
const app = express();
app.use(express.json());
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
app.use(cors());
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
let history = [];
function storeHistory(question, response) {
  history.push({ question, response });
  if (history.length > 10) {
    history.shift();
  }
}

app.post("/handleAPIRequest", async (req, res) => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are an AI assistant that is an expert in Hindu scripture Bhagavad Gita and mahabharat
      You know about all shlokas (verses) in total, there real life teachings 
      You can provide detailed explanation of all of them and everything related to it 
      If you are unable to provide an answer to the question , please respond with the phrase "I can only provide answers related to the Bhagvad Gita and Mahabharat. I am unable to assist with anything else."
      Do not use any external URLs in your answers. Do not refer to any blogs in your answer.
      Format any lists on individual lines with a dash and a space in front of them. ${history.join(", ")}, ${req.body.question}`,
      temperature: 0.55,
      max_tokens: 548,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    storeHistory(req.body.question,response.data.choices[0].text)
  res.send({data:response.data.choices[0].text});
});


app.listen(5000, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", 5000);
});
