var express = require('express');
 var formidable = require('formidable')
var router = express.Router();
var fs = require('fs'); 

router.get('/capturelist', function(req, res) {
    var db = req.db;
    var collection = db.get('capturelist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});
router.post('/upload', function(req, res) {
	//console.log(req.files.image.originalFilename);
    console.log('upload serv' +req.body);
	console.log('req.url' +req.body);
	console.log('req.url' +req.method);
	console.log('err' +err.message);
	if (req.url == '/upload' && req.method.toLowerCase() == 'post')
	{
		var form = new formidable.IncomingForm();
	}
	form.parse(req, function(err, fields, files) {
        if (err) {
          // Check for and handle any errors here.
          console.error(err.message);
          return;
        }
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
	
        // This last line responds to the form submission with a list of the parsed data and files.

        res.end(util.inspect({fields: fields, files: files}));
      });
/*      fs.readFile(req.files.image.path, function (err, data){
        var dirname = "/public/fileuploads";
        var newPath = dirname + "/uploads/" +   req.files.image.originalFilename;
        fs.writeFile(newPath, data, function (err) {
			if(err){
				res.json({'response':"Error"});
			}else {
				res.json({'response':"Saved"});
			}
    var db = req.db;
		});
        });*/
        var db = req.db;
        var collection = db.get('capturelist');

        collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: req.body } : { msg: err }
        );
	});
});

router.get('/searchCapture/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('capturelist');
	var patientToFetch = req.params.id;
	console.log('capturelist'+patientToFetch);
	collection.find({"patient_id":patientToFetch},function(err,data) {
		res.json(data);		
    });
});

router.get('/upload', function (req, res){
//        file = req.params.fille;
console.log('file get upload : ' + req.body);
        var dirname = "/public/fileuploads";
//        var img = fs.readFileSync(dirname + "/uploads/" + file);
        var img = req.data;
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'base64');
 });

/*
 * POST to adduser.
 */
router.post('/addcapture', function(req, res) {
    var db = req.db;
	var collection = db.get('capturelist');

	collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});
/*
 * DELETE to deleteuser.
 */
router.delete('/deletecapture/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('capturelist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


/*
 * 
 */
router.put('/updatecapture/:id', function(req, res) {
    var db = req.db;
	var user = req.body;
    var collection = db.get('capturelist');
    var userToUpdate = req.params.id;
	    db.collection('capturelist', function(err, collection) {
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

module.exports = router;
