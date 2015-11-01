
$(document).ready(function(){
//	if (window.location.search.split("patientid=")[1])
	   findCapture();
   // check login details button click
  // $('#validateUser').on('click', loginapp); //Submit the form
	
});
	
				
$(function() {

    $('#side-menu').metisMenu();

});

var uploadServiceURL = 'http://104.197.53.84:3000/captures/upload/';
var photoURL;

	function onAfterPhotoCapture(event){
	    alert(event.preview);
		var cameraBtn = document.getElementById('cameraBtn');
		if (event.preview)  {
			//show the thumbnail preview
			var thumbnailElem = document.createElement("img");
			thumbnailElem.setAttribute('src', event.preview);
			photoURL = event.preview;
			thumbnailElem.style.float = 'right';
		}
		if (event.response)  {
			//show the image
			photoURL = event.preview;
			var imageLink = document.createElement('a');
			imageLink.setAttribute('class','button');
			imageLink.innerHTML = 'Click to view the photo';
			imageLink.setAttribute('href', photoURL);
			//set the thumbnail img as the link child
			imageLink.appendChild(thumbnailElem);
			//append the new link after the camera btn
			cameraBtn.parentNode.appendChild(imageLink);
			saveCapture();
		}
	}
	
	function saveCapture() {
	    
	//event.preventDefault();
	// Check and make sure errorCount's still at zero
            // If it is, compile all user info into one object
 //       var newPatient = preparePatientJson();
//		var datestring = newPatient.dob.substring(8, 10)+newPatient.dob.substring(5, 7)+newPatient.dob.substring(0, 4);
//		newPatient.patient_id = newPatient.firstName.substring(0, 4)+newPatient.lastName.substring(0,1)+datestring;
		var newCapture = {
			'patient_id' : 'MarrJ08091967',
			'image_path' : './views/flower.jpg'
			};
		newCapture.patient_id = window.location.search.split("patientid=")[1];
		if (photoURL)
			newCapture.image_path = photoURL;
		else 
			newCapture.image_path = '/opt/bitnami/apache2/htdocs/bootstrap/pages/chart.jpg';
		
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newCapture,
            url: 'http://104.197.53.84:3000/captures/addcapture',
            dataType: 'JSON'
        }).done(function( response ) {  
			// Check for successful (blank) response
            if (response.msg === '') {
				        alert('Success: ' + response.msg);
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });    
	}
	
	function findCapture() {
	
		var identifier ;
		var cameraBtn = document.getElementById('cameraBtn');
		identifier = window.location.search.split("patientid=")[1];
		$.ajax({
        type: "GET",
        url: "http://104.197.53.84:3000/captures/searchCapture/" + identifier
		}).done(function( data ) {
			console.log(data); 
		  if(data != null){
				var thumbnailElem;
				var imageLink;
				var icnt;
				icnt=0;
				 $.each(data, function(){
					 icnt++;
					console.log("image extract:" + this.image_path);
					thumbnailElem = document.createElement("img");
					thumbnailElem.setAttribute('src', this.image_path);
					thumbnailElem.setAttribute('class', 'image');
					imageLink = document.createElement('a');
					imageLink.setAttribute('class','button');
					imageLink.innerHTML = 'Click here to view image : ' + icnt;
					imageLink.setAttribute('href', this.image_path);
					imageLink.appendChild(thumbnailElem);
					cameraBtn.parentNode.appendChild(imageLink);
				});
			} else{
		
			alert('error data not found');
			}	
		});
		
	}
	
	function deleteCapture() {
		identifier = window.location.search.split("patientid=")[1];
	}