const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
const app = express();
const { uri } = require("./config.json");
mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    replicaSet: "Cluster0-shard-0"
});
mongoose.connect('mongodb://localhost:27017/hack', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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
    provider_id: {type: mongoose.Schema.Types.ObjectId, ref: "Providers"},
    // provider_id: providerSchema,
    name: String,
    age: Number,
    email: String,
    medications: [medicationSchema]
});

var providerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    // profiles: [{type: mongoose.Schema.Types.ObjectId, ref: "Profiles" }]
    profiles: [profileSchema]
});

const Provider = mongoose.model('Provider', providerSchema, "Providers");
const Profile = mongoose.model('Profile', profileSchema, "Profiles");
const Medication = mongoose.model('Medication', medicationSchema, "Medications");
const History = mongoose.model('History', usageHistorySchema, "Histories");
const Dosage = mongoose.model('Dosage', dosageSchema, "Dosages");

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

app.post('/api/provider-create', async (req, res) => {
    console.log("asd");
    if (await Provider.findOne({email: req.body.email})) res.status(400).send();
    await Provider.insertOne({name: req.body.name, email: req.body.name, phone: req.body.phone})
        .then(provider => {
            res.status(200).send(provider);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.get('api/get-provider/:id', async (req, res) => {
    await Provider.findOne({_id: mongoose.Types.ObjectId(req.params.id)})
        .then(provider => {
            res.status(200).send(provider);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.delete('api/del-provider', async (req, res) => {
    await Provider.deleteOne({_id: mongoose.Types.ObjectId(req.user._id)})
        .then(del => {
            res.status(200).send(del)
        })
        .catch(err => {
            res.status(400).send(err)
        });
});

app.post('api/update-provider/:id', async (req, res) => { //adds new patient to the provider
   const provider = await Provider.updateOne({_id: req.user._id}, {name: req.body.name, email: req.body.email, phone: req.body.phone});
   const profile = await Profile.findOne({_id: mongoose.Types.ObjectId(req.params.id)});
   provider.profiles.push(profile);
   profile.provider_id = provider;
   provider.markModified("profiles");
   profile.markModified("provider_id");
   await provider.save();
   await profile.save();
   if (provider && profile) res.status(200).send();
   else res.status(400).send(err);
});

app.get('api/get-patients-provider/:id', async (req, res) => {
   await (Provider.findOne({_id: mongoose.Types.ObjectId(req.params.id)})).profiles
       .then(profiles => {
           res.status(200).send(profiles);
       })
       .catch(err => {
           res.status(400).send(err);
       });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
