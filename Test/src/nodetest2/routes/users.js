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
	var user = req.body;
    var collection = db.get('useridpwd');
	var userToFind = req.body.username;
	var passwordToMatch = req.body.password;
	    db.collection('users', function(err, collection) {
	    collection.findone({'userid':userToFind},{},function(e,docs){
           if (err) {
                console.log('docs'+docs);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + docs + ' document(s) readed');
				collection.findone({'userid':userToFind, 'password':passwordToMatch},{},function(e,docs){
					res.json(docs);
				});
				
            }
        });
    });

});



module.exports = router;
