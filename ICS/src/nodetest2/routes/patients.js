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
* get patient list assigned to doctor
*/
router.get('/patientlistdet/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('patientlist');
	var patientToFetch = req.params.id;
	console.log('patientToFetch'+patientToFetch);
	collection.find({"assignedDoctor":patientToFetch},function(err,data) {
		res.json(data);		
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
 * POST to addClinicalDetails.
 */
router.post('/addClinicalDetails', function(req, res) {
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
	collection.update({'patient_id':dataToUpdate}, {"$set":clinicalExamData}, {safe:true}, function(err, result) {
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
    var collection = db.get('appointment');
    var patientToUpdate = patient.patient_id;
	var docEmail = patient.email;
	var appDate = patient.appDate;
	var stTime = patient.stTime;
	var enTime = patient.enTime;
	console.log('patientToUpdate ::::'+patientToUpdate);
	console.log('doctor ::::'+docEmail);
	collection.update({'doctor_id':docEmail,'appDate':appDate,'stTime':stTime,'enTime':enTime}, {$set:{patient_id:patientToUpdate}}, function(err, result) {
	    res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
	});
    
});


/*
 * GET cancer analytics
 */
router.get('/analyticsArea', function(req, res) {
	var db = req.db;
	var collection = db.get('patientlist');

	
	collection.col.aggregate(
		  [
			  { "$group": {
				  "_id": "$state",
				  "count": { "$sum": 1 }
			  }}
		  ],
		  function(err,docs) {
			 if (err) console.log(err);
			 console.log( docs );
			 res.send(docs);
		  }
	  );	
	
	
});

/*
 * GET cancer analytics
 */
router.get('/analyticsGender', function(req, res) {
	var db = req.db;
	var collection = db.get('patientlist');

	
	collection.col.aggregate(
		  [
			  { "$group": {
				  "_id": "$gender",
				  "count": { "$sum": 1 }
			  }}
		  ],
		  function(err,docs) {
			 if (err) console.log(err);
			 console.log( docs );
			 res.send(docs);
		  }
	  );	
	
	
});

/*
 * GET cancer analytics
 */
router.get('/screendedAnalytics', function(req, res) {
	var db = req.db;
	var collection = db.get('patientlist');

	
	collection.col.aggregate(
		  [
			  { "$group": {
				  "_id": "$gender",
				  "count": { "$sum": 1 }
			  }}
		  ],
		  function(err,docs) {
			 if (err) console.log(err);
			 console.log( docs );
			 res.send(docs);
		  }
	  );	
	
	
});

module.exports = router;
