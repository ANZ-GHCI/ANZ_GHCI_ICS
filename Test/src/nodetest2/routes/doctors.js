var express = require('express');
var router = express.Router();


/*
 * GET userlist.
 */
router.get('/doctorlist', function(req, res) {
    var db = req.db;
    var collection = db.get('doctorlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
* search patient
*/
router.post('/searchPatient', function(req, res) {
    var db = req.db;
    var collection = db.get('patientlist');
	var patientToFetch = req.body.patient_id;
	collection.findOne({"patient_id":patientToFetch},function(err,data) {
		res.json(data);		
    });
});



/*
 * GET patientlist for doctor.
 */
router.get('/patientlist', function(req, res) {
    var db = req.db;
    var collection = db.get('patientlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * POST to adduser.
 */
router.post('/adddoctor', function(req, res) {
    var db = req.db;
    var collection = db.get('doctorlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deletedoctor/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('doctorlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
 * POST to addDoctorFeedback.
 */
router.post('/addDoctorFeedback', function(req, res) {
    var db = req.db;
    var collection = db.get('feedbacklist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * GET feedbacklist.
 */
router.get('/feedbacklist', function(req, res) {
    var db = req.db;
    var collection = db.get('feedbacklist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
* search doctor feedback
*/
router.get('/searchDoctorFeedback', function(req, res) {
    var db = req.db;
    var collection = db.get('feedbacklist');
	var dataToFetch = req.body.doctorId;
    collection.find({},function(err,data){
        res.json(data);
    });
});

/*
 * Update doctor feedback
 */
router.put('/updateDoctorFeedback/:id', function(req, res) {
    var db = req.db;
	var doctorFeedbackData = req.body;
    var collection = db.get('feedbacklist');
    var dataToUpdate = req.params.id;

	collection.update({'_id':dataToUpdate}, {"$set":doctorFeedbackData}, {safe:true}, function(err, result) {
	console.log(err);
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
	});
});

module.exports = router;
