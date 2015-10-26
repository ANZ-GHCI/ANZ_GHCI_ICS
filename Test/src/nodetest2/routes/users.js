var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) { 
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


/*
 * 
 */
router.put('/updateuser/:id', function(req, res) {
    var db = req.db;
	var user = req.body;
    var collection = db.get('userlist');
    var userToUpdate = req.params.id;
	    db.collection('users', function(err, collection) {
        collection.update({'_id':userToUpdate}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });

});


/*
 * Login Validation
 */
router.post('/login', function(req,res) {
	var db = req.db;
	var collection = db.get('userlist');
	var userToFind = req.body.username;
	var passwordToMatch = req.body.password;
	console.log('userToFind :::;; '+userToFind+"===="+passwordToMatch);
	collection.findOne({"email":userToFind,"password":passwordToMatch},function(err,data) {
		req.session.user = data;
		res.json(data);
	});
});


/*
* search patient
*/
router.post('/searchUser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
	var usersToFetch = req.body;
	collection.find( usersToFetch,function(err,data) {
		res.json(data);		
    });
});

/*
 * GET userlist.
 */
router.get('/patientlist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('patientlist');
	var patientID  = req.params.id
	console.log('id :::'+patientID);;
    collection.find({patient_id:patientID},{},function(e,docs){
		res.json(docs);
    });
});

/*
 * GET doctors userlist.
 */
router.get('/doctorslist', function(req, res) {
	console.log('retrieve doctors list');
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({"userType":"Doctor"},{"firstName":1, "lastName":2,"email":0},function(e,docs){
        res.json(docs);
    }); 
});



module.exports = router;