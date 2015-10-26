// Userlist data array for filling in info box
var doctorListData = [];

$(function() {
	$(document).ready(function(){ 

   	   // fetch patient list assigned to doctor
		//alert('loading doctors.js to populate patient list');
		populateTable();
		
		// patient reg no link click
   	//  $('#fetchPatient').on('click', fetchPatientdet()); //Submit the form
		 $('#ListPatient table tbody').on('click', 'td a.linkClinicalInfo', fetchPatientdet);	
		 		// $('#patientList table tbody').on('click', 'td a.linkInfo', fetchPatientdet);	
	});
});	

// fetchPatient details
function fetchPatientdet(event) {  
	//alert('add doctor');
	//alert($('#fetchPatient').attr('rel'));
    event.preventDefault();
	
	
	var patient = {'patientId' : $('#fetchPatient').attr('rel')};

	window.location="clinicalExamination.html";
	
	$.ajax({
        type: "GET",
        url: "http://localhost:3000/patients/searchPatient/",
        dataType: "json",
		data: patient,
		success: function(data) { 
			patientListData = data; 
			var thisUserObject = patientListData[0];
		
		//	$.each(data, function(){
				$('#patient_id').val(thisUserObject.patientId);
				alert(thisUserObject.firstName);
				$('#firstName').val(thisUserObject.firstName);
				//$('#lastName').val(thisUserObject.lastName);
				//	$('#patient_id').val(thisUserObject._id);
				//$('#firstName').val(thisUserObject.firstName);
				//$('#lastName').val(thisUserObject.lastName);
				//$('#email').val(thisUserObject.email);
				//$('#dob').val(thisUserObject.dob);
				//$("[name=gender]").val([thisUserObject.gender]);
				//$('#address').val(thisUserObject.address);				
				//$('#homePhone').val(thisUserObject.homePhone);
				//$('#MobilePhone').val(thisUserObject.MobilePhone);
				//$('#income').val(thisUserObject.income);
				//$('#occupation').val(thisUserObject.occupation);
				//$('#education').val(thisUserObject.education);
				//$('#religion').val(thisUserObject.religion);
				//$('#maritalStatus').val(thisUserObject.maritalStatus);
				//$('#noofChildren').val(thisUserObject.noofChildren);
				
				//$("[name=smoke]").val([thisUserObject.smoke]);
				//$("[name=chewing]").val([thisUserObject.chewing]);
				//$("[name=snuffing]").val([thisUserObject.snuffing]);
				//$("[name=alcohol]").val([thisUserObject.alcohol]);
				//$("[name=food]").val([thisUserObject.food]);
				
				
				//$("[id=diabetes]").val([thisUserObject.diabetes]);
				//$("[id=bp]").val([thisUserObject.bp]);
				//$("[id=tb]").val([thisUserObject.tb]);
				//$("[id=heart_disease]").val([thisUserObject.heart_disease]);
				//$("[id=cancer]").val([thisUserObject.cancer]);
				//$("[id=others]").val([thisUserObject.others]);
			//});
		    }
		});
	//window.location="clinicalExamination.html";
	
};

	
$(function() {

    $('#side-menu').metisMenu();
	
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
	
});


// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = doctorListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = doctorListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};

// Add User
function addDoctor(event) {  alert('add doctor');
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addDoctor input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addDoctor fieldset input#inputUserName').val(),
            'email': $('#addDoctor fieldset input#inputUserEmail').val(),
            'fullname': $('#addDoctor fieldset input#inputUserFullname').val(),
            'age': $('#addDoctor fieldset input#inputUserAge').val(),
            'location': $('#addDoctor fieldset input#inputUserLocation').val(),
            'gender': $('#addDoctor fieldset input#inputUserGender').val()
        }
		alert('newUser: '+newUser.username);
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: 'http://localhost:3000/doctors/adddoctor',
            dataType: 'JSON'
        }).done(function( response ) {  alert('&&&&&&&&&&'+response.msg);

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addDoctor fieldset input').val('');

                // Update the table
                //populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};


// Delete User
function deleteDoctor(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/doctors/deletedoctor/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
