var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('test', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'winedb' database");
        db.collection('Polls', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'Polls' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving poll: ' + id);
    db.collection('Polls', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('Polls', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addPoll = function(req, res) {
    var poll = req.body;
    console.log('Adding Poll: ' + JSON.stringify(poll));
    db.collection('Polls', function(err, collection) {
        collection.insert(poll, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updatePoll = function(req, res) {
    var id = req.params.id;
    var poll = req.body;
    console.log('Updating poll: ' + id);
    console.log(JSON.stringify(poll));
    db.collection('Polls', function(err, collection) {
        collection.updateById({'_id':new BSON.ObjectID(id)}, poll, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating poll: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(poll);
            }
        });
    });
}

exports.deletePoll = function(req, res) {
    var id = req.params.id;
    console.log('Deleting poll: ' + id);
    db.collection('Polls', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
