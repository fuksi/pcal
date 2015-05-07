var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server.");
//   db.close();
// });


var insertUser = function(db, callback) {
   db.collection('users').insertOne( {
      "username" : "qwer1234@gmail.com",
      "password" : "qwer1234"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback(result);
  });
};

var result = {};


var insertEvent = function(db, name, startDate, startTime, duration, color, callback) {
   db.collection('events').insertOne({
      "color": color,
      "name": name,
      "date": startDate,
      "time": startTime,
      "duration": duration,
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted an event");
    callback(result);
  });
};


var findUser = function(db, username, password, callback) {
   var cursor =db.collection('users').find({"username": username, "password": password});
   var count = 1; // Only need one result
   cursor.each(function(err, doc) {
       if (count == 1) {
         count++;
           callback(doc);
       } else {

       }
   });
};


var findEvent = function(db, callback) {
   var cursor = db.collection('events').find();
   //var count = 1; // Only need one result
   cursor.each(function(err, doc) {
       if (doc != null) {
         //count++;
           callback(doc);
       } else {

       }
   });
};



MongoClient.connect(url, function(err, db) {
  //findUser(db, "qwer1234@gmail.com", "qwer1234", function(doc) {
  insertEvent(db, "Go home", "16-05-2015", "05:50", "04:00", "red", function(doc) {
  //findEvent(db, function(doc) {
  	  if (doc) {
  	  	console.log(doc);
  	  	db.close();	
  	  }
  	  else {
  	  	console.log("Not found");
  	  	db.close();	
  	  }
  });
});