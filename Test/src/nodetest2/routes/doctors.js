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


module.exports = router;
