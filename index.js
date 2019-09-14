const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hack', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const app = express();
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// MODELS
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
    name: String,
    age: Number,
    email: String,
    medications: [medicationSchema]
});

var providerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    profiles: [profileSchema]
});

const Provider = mongoose.model('Provider', providerSchema, "Providers");
const Profile = mongoose.model('Profile', profileSchema, "Profiles");
const Medication = mongoose.model('Medication', medicationSchema, "Medications");
const History = mongoose.model('History', usageHistorySchema, "Histories");
const Dosage = mongoose.model('Dosage', dosageSchema, "Dosages");

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/provider-create', async (req, res) => {
    let provider = new Provider(req.body.data);
    await provider.save()
        .then((p) => {
            res.status(200).send(p);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.get('api/get-provider/:id', async (req, res) => {
    await Provider.findById(req.params.id)
        .then(provider => {
            res.status(200).send(JSON.stringify(provider));
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.delete('api/del-provider', async (req, res) => {
    await Provider.findByIdAndRemove(req.user._id)
        .then(del => {
            res.status(200).send(JSON.stringify(del))
        })
        .catch(err => {
            res.status(400).send(err)
        });
});

app.post('api/update-provider/:id', async (req, res) => { //adds new patient to the provider
   const provider = await Provider.updateOne({_id: req.user._id}, {name: req.body.name, email: req.body.email, phone: req.body.phone});
   provider.markModified("profiles");
   await provider.save()
     .then(p => {
       res.status(200).send(JSON.stringify(p));
     })
     .catch(err => {
       res.status(400).send(err);
     });
});

app.get('api/get-patients-provider/:id', async (req, res) => {
   await (Provider.findOne({_id: mongoose.Types.ObjectId(req.params.id)})).profiles
       .then(profiles => {
           res.status(200).send(JSON.stringify(profiles));
       })
       .catch(err => {
           res.status(400).send(err);
       });
});

const port = process.env.PORT || 5000;
app.listen(port);

// Profile endpoints

// CREATE
app.post('/api/profile', async (req, res) => {
  let profile = new Profile(req.body.profile);
  await profile.save()
    .then((p) => {
      let provider = Provider.findById(req.body.providerId)
      p.provider_id = provider;
      provider.profiles.push(p);
      res.status(200).send(JSON.stringify(p));
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// PUT
app.put('/api/profile/', async (req, res) => {
  await Profile.findById(req.body.id)
    .then((profile) => {
      profile.medications.push(new Medication(req.body.medication));
      profile.markModified('medications');
      profile.save();
      res.status(200).send(JSON.stringify(profile));
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// GET
app.get('/api/profile/:id', async (req, res) => {
  await Profile.findById(req.params.id).lean().exec()
    .then((p) => {
      res.status(200).send(JSON.stringify(p));
    })
    .catch((e) => {
      res.status(400).send(err);
    });
});

// DELETE
app.delete('/api/profile', async (req, res) => {
  await Profile.findByIdAndRemove(req.body.id)
    .then(p => {
      res.status(200).send(JSON.stringify(p));
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Medication endpoints

// History endpoints

console.log('App is listening on port ' + port);
