const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
mongoose.connect('mongodb://localhost:27017/hack', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

////////////////////////////////////////////////////
// MODELS
var providerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String });

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

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

// Profile endpoints

// CREATE
app.post('/api/profile', (req, res) => {
  console.log(req);
  let profile = new Profile(req.body.data);
  profile.save(function (err, p) {
    if (err) return res.json(JSON.stringify(err));
    res.json(p);
  });
});

// GET
app.get('/api/profile', (req, res) => {
  console.log(req);
  Profile.find().lean().exec(req.params.query, function (err, p) {
    if (err) return res.json(JSON.stringify(err));
    res.json(JSON.stringify(p));
  });
});

// PUT

// DELETE
app.delete('/api/profile', (req, res) => {
  Profile.deleteOne(res.body.query, function (err, p) {
    if (err) return res.status(400).end();
    res.status(200).end();
  });
});

// Provider endpoints

console.log('App is listening on port ' + port);
