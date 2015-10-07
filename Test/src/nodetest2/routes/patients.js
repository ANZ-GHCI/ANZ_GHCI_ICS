var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/patientlist', function(req, res) {
    var db = req.db;
    var collection = db.get('patientlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/searchPatient', function(req, res) {
    var db = req.db;
    var collection = db.get('patientlist');
	var userToFetch = req.body.firstName;
    collection.find({"firstName" : userToFetch },function(err,data){
        res.json(data);
    });
});

/*
 * POST to adduser.
 */
router.post('/addpatient', function(req, res) {
    var db = req.db;
    var collection = db.get('patientlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deletepatient/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('patientlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


/*
 * 
 */
router.put('/updatepatient/:id', function(req, res) {
    var db = req.db;
	var patient = req.body;
    var collection = db.get('patientlist');
    var userToUpdate = req.params.id;

	collection.update({'_id':userToUpdate}, {"$set":patient}, {safe:true}, function(err, result) {
	console.log(err);
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
	});
    

});

module.exports = router;
