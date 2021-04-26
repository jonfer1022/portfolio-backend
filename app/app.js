const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const axios = require("axios");
const port = (process.env.PORT || 3001);

//Inizialitions
const app = express();
const captcha = require('./routes/captcha');

//Settings
app.set('port',port)

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get("/alive", (req,res) =>{
  res.send("¡Hello whoever you are!")
})

app.post("/token", async (req, res) =>{
  if(!req.body.token){
    return res.send("NOT TOKEN")
  }
  try {
    const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.token}`;
    const response = await axios.post(googleVerifyUrl);
    const { success } = response.data;
    if( success ) {
      return res.json({success: true})
    } else{
      return res.json({error: "Captcha invalido"})
    }
  } catch (error) {
    return res.json({error: `Razón error: ${error}`})
  }
});

module.exports = app;