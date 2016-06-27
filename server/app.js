
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/pets');

var petSchema = new  mongoose.Schema({
  name: String,
  animal: String,
  age: Number,
  image: String
});
var petModel = mongoose.model( 'petModel', petSchema );

app.listen(3000, 'localhost', function(req, res){
  console.log('listening on 3000');
});
//loads index.html on entering base url, localhost:3000
app.get('/', function(req, res){
  res.sendFile(path.resolve('views/index.html'));
});
//loads addPet.html on entering addPet url, localhost:3000/addPet
app.get('/addPet', function(req, res){
  console.log('in /addPet path');
  res.sendFile(path.resolve('views/addPet.html'));
});
//loads viewPet.html on entering viewPet url, localhost:3000/viewPet
app.get('/viewPet', function(req, res){
  console.log('in /viewPet path');
  res.sendFile(path.resolve('views/viewPet.html'));
});
// adds pet to collection in db from input fields in add pet view
app.post('/addPet', function(req, res){
  console.log( 'req.body: ' + req.body.name );

  var recordToAdd={
   name: req.body.name,
   animal: req.body.animal,
   age: req.body.age,
   image: req.body.image
 };
 var newRecord=petModel( recordToAdd );
  newRecord.save();
});
// sends all the data from the collection to the show pets view
app.get('/getRecords', function(req, res){
  petModel.find()
  .then( function( data ){
    res.send( data );
  });
});
// deletes specfic pet record from db when delete button is clicked in show pets view
app.post('/deletePet', function (req, res){
  console.log(req.body.id);
  petModel.findOne({'_id': req.body.id}, function(err, pet){
    if(err){
      console.log(err);
    }else{
      petModel.remove({'_id': req.body.id}, function(err){
        if(err){
          console.log('remove ' + err);
        }else{
        }
      });
    }
  });
});

app.use( express.static( 'public' ) );
