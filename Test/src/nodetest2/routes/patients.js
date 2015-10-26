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

/*
* search patient
*/
router.get('/searchPatient/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('patientlist');
	var patientToFetch = req.params.id;
	console.log('patientToFetch'+patientToFetch);
	collection.findOne({"patient_id":patientToFetch},function(err,data) {
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
 * Update patient information
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

/*
 * GET clinicalExamlist.
 */
router.get('/clinicalExamList', function(req, res) {
    var db = req.db;
    var collection = db.get('clinicalExamList');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * POST to addClinicalExam.
 */
router.post('/addClinicalExam', function(req, res) {
    var db = req.db;
    var collection = db.get('clinicalExamList');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
* search clinical exam
*/
router.get('/searchClinicalDetails/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('clinicalExamList');
	var patientToFetch = req.params.id;
	console.log('patientToFetch'+patientToFetch);
	collection.findOne({"patient_id":patientToFetch},function(err,data) {
		res.json(data);
		//res.end('clinicalExamination.html');
    });
});


/*
 * Update clinical examination
 */
router.put('/updateClinicalExam/:id', function(req, res) {
    var db = req.db;
	var clinicalExamData = req.body;
    var collection = db.get('clinicalExamList');
    var dataToUpdate = req.params.id;

	collection.update({'patientid':dataToUpdate}, {"$set":clinicalExamData}, {safe:true}, function(err, result) {
	console.log(err);
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
	});
    

});


/*
 * Update patient reg information
 */
router.post('/updatepatientreg/:id', function(req, res) {
    var db = req.db;
	var patient = req.body;
    var collection = db.get('patientlist');
    var userToUpdate = req.params.patient_id;

	collection.update({'patient_id':userToUpdate}, {"$set":patient}, {safe:true}, function(err, result) {
	console.log(err);
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
	});
    

});


/*
 * Assign doctor
 */
router.put('/assignDoctor', function(req, res) {
    var db = req.db;
	var patient = req.body;
    var collection = db.get('patientlist');
    var patientToUpdate = patient.patient_id;
	console.log('patientToUpdate ::::'+patientToUpdate);
	collection.update({'patient_id':patientToUpdate}, {$set:{assignedDoctor:req.body.email}}, {safe:true}, function(err, result) {
	    res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
	});
    

});

module.exports = router;
