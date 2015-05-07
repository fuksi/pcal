var express = require('express');
var	app = express();
var	bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

// Middleware
app.use(bodyParser.json());  // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));  // to support URL-encoded bodies
app.use(express.static('public'));

// Add html as an render engine
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

// CRUD OPERATIONS

var findUsers = function(db, username, password, callback) {
   var cursor =db.collection('users').find({"username": username, "password": password});
   var count = 1; // Only need one result
   cursor.each(function(err, doc) {
   		 if (count == 1) {
   		 	 count++;
	      	 callback(doc);
	     } else {
	     	// just pass
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

var insertUser = function(db, username, password, callback) {
   db.collection('users').insertOne({
      "username" : username,
      "password" : password
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a user into users collection");
    callback(result);
  });
};

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

var deleteEvent = function(db, eventID, callback) {
	console.log(eventID);
	db.collection('events').deleteOne({
		_id : ObjectId(eventID)
	}, function(err, result) {
		assert.equal(err, null);
		callback(result);
	});
};

// Authentication

app.post('/login', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.error(err);
		} else {
			findUsers(db, req.body.username, req.body.password, function(doc) {
				if (doc) {
			  	  	console.log(doc);
			  	  	db.close();	
			  	  	res.redirect('/home');
				}
				else {
					res.redirect('/fail')
					console.log("Not found");
					db.close();	
				}
			})
		}
	});
});


app.get('/getevent', function(req, res) {
	MongoClient.connect(url, function(err, db) {

		var result = { events: [] };
		findEvent(db, function(doc) {
			result.events.push(doc)			
			db.close();
		});

		setTimeout(function () {
			//console.log(result);
			res.json(result);
		}, 0);
	});
});

app.post('/signup', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.error(err);
		} else {
			insertUser(db, req.body.username, req.body.password, function(doc) {
				console.log('Added a user');
			})
		}
	});
});

app.post('/addevent', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.error(err);
		} else {
			insertEvent(db, req.body.name, req.body.date, req.body.time, req.body.duration, req.body.color, function(doc) {
				console.log('Added a event');
			})
		}
	});
});

app.post('/deleteevent', function(req, res, next) {
	console.log("received request");
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.error(err);
		} else {
			deleteEvent(db, req.body.eventID, function(doc) {
				console.log('Deleted an event');
			})
		}
	});
});

 
// Others routing 
app.get('/', function(req, res) {
	res.render('login.html');
});

app.get('/home', function(req, res) {
	res.render('main.html');
});

app.get('/succeed', function (req, res) {
	res.send('Login suceeded');
})

app.get('/fail', function (req, res) {
	res.render('login_fail.html');
})



app.listen(8000, function() {
	console.log("Listening to port 8000");
});