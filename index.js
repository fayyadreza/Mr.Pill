const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
const app = express();
const { uri } = require("../config.json");
mongoose.connect(URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    replicaSet: "HTN"
});
mongoose.connect('mongodb://localhost:27017/hack', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var providerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

var dosageSchema = new mongoose.Schema({
  time: String,
  amount: Number
});

var usageHistorySchema = new mongoose.Schema({
  status: Boolean,
  updated_at: Date
});

var medicationSchema = new mongoose.Schema({
  status: Boolean,
  name: String,
  illness: String,
  dosage: dosageSchema,
  current_size: Number,
  history: [usageHistorySchema]
});

var profileSchema = new mongoose.Schema({
  provider_id: mongoose.Schema.Types.ObjectId,
  name: String,
  age: Number,
  email: String,
  medications: [medicationSchema]
});

var Provider = mongoose.model('Provider', providerSchema);
var Profile = mongoose.model('Profile', profileSchema);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a profile
app.get('/api/profile', (req,res) => {
    res.json('test');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
