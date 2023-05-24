const database_uri = 'mongodb+srv://solo_dev23:kd35mj23cr7@cluster0.tevy35r.mongodb.net/?retryWrites=true&w=majority'

const shortid = require('shortid')
const bodyParser = require('body-parser')
const express = require('express');
const mongo= require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const {Schema} = mongoose
const app = express();


// Basic Configuration
const port = process.env.PORT || 3000;


mongoose.connect(database_uri);

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const shorterUrl = mongoose.model('shorterUrl', 
new Schema({
    short_url: String,
    original_url: Number
}))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/shorturl',  (req, res) => {
  let requestedUrl = req.body.url
  let urlId = shortid.generate() 
  let newUrlId = urlId 
  
  let newUrl = new shorterUrl({
  original_url: requestedUrl,
    short_url: __dirname + "/api/shorurl" + newUrlId
  })

  res.json({
    "original-url":requestedUrl,
    "short_url": newUrlId
  })
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
