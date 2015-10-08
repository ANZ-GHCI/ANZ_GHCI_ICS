var patientListData = [];

$(function() {
	$(document).ready(function(){
		$('#savePatient').on('click', function(event){
		
			if($('#patient_id').val()!=''){	
				updatePatient(event);//Update patient
			}else{
				savePatient(event); //Add the patient
			}	
		});
		$('#reset').on('click', resetFields); //Reset the form
		$('#searchPatient').on('click', findPatient); //searchPatient

	});
});

function resetFields(event) {

	event.preventDefault();
	window.location="patient-registration.html";
}				
				
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

function findPatient(event) {
	// Prevent Link from Firing
   event.preventDefault();
   //window.location="patient-registration.html";
   var patient = {'firstName' : $('#patientid').val()};

        $.ajax({
        type: "GET",
        url: "http://localhost:3000/patients/searchPatient/",
        dataType: "json",
		data: patient,
		success: function(data) { 
			patientListData = data;
			var thisUserObject = patientListData[0];
			
			$('#patient_id').val(thisUserObject._id);
			$('#firstName').val(thisUserObject.firstName);
			$('#lastName').val(thisUserObject.lastName);
			$('#email').val(thisUserObject.email);
			$('#dob').val(thisUserObject.dob);
			$("[name=gender]").val([thisUserObject.gender]);
			$('#address').val(thisUserObject.address);				
			$('#homePhone').val(thisUserObject.homePhone);
			$('#MobilePhone').val(thisUserObject.MobilePhone);
			$('#income').val(thisUserObject.income);
			$('#occupation').val(thisUserObject.occupation);
			$('#education').val(thisUserObject.education);
			$('#religion').val(thisUserObject.religion);
			$('#maritalStatus').val(thisUserObject.maritalStatus);
			$('#noofChildren').val(thisUserObject.noofChildren);
			
			$("[name=smoke]").val([thisUserObject.smoke]);
			$("[name=chewing]").val([thisUserObject.chewing]);
			$("[name=snuffing]").val([thisUserObject.snuffing]);
			$("[name=alcohol]").val([thisUserObject.alcohol]);
			$("[name=food]").val([thisUserObject.food]);
			
			
			$("[id=diabetes]").val([thisUserObject.diabetes]);
			$("[id=bp]").val([thisUserObject.bp]);
			$("[id=tb]").val([thisUserObject.tb]);
			$("[id=heart_disease]").val([thisUserObject.heart_disease]);
			$("[id=cancer]").val([thisUserObject.cancer]);
			$("[id=others]").val([thisUserObject.others]);
		    }
		});
		
};

// Add User
function savePatient(event) {
    
	// Super basic validation - increase errorCount variable if any fields are blank
	//$("#patientRegistrationForm").validate();
	event.preventDefault();
	// Check and make sure errorCount's still at zero
            // If it is, compile all user info into one object
        var newPatient = preparePatientJson();
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newPatient,
            url: 'http://localhost:3000/patients/addpatient',
            dataType: 'JSON'
        }).done(function( response ) {
			// Check for successful (blank) response
            if (response.msg === '') {
				window.location="patient-registration.html";
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    
};

// update patient
function updatePatient(event) {  
    event.preventDefault();
    // Pop up a confirmation dialog
    
    var patientDetails = preparePatientJson();	   
		
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/patients/updatepatient/' + $('#patient_id').val(),
			data: patientDetails
        }).done(function( response ) {
			
            // Check for a successful (blank) response
            if (response.msg === '') {
				window.location="patient-registration.html";            
			}
            else {
                alert('Error: ' + response.msg);
            }

        });
};
		
function preparePatientJson(){ 
	var patient = {
			'firstName': $('#addPatient fieldset input#firstName').val(),
            'lastName': $('#addPatient fieldset input#lastName').val(),
            'email': $('#addPatient fieldset input#email').val(),
            'dob': $('#addPatient fieldset input#dob').val(),
            'gender': $('#addPatient fieldset input[name=gender]:checked').val(),
			'address': $('#addPatient fieldset textarea#address').val(),
            'homePhone': $('#addPatient fieldset input#homePhone').val(),
            'MobilePhone': $('#addPatient fieldset input#MobilePhone').val(),
            'income': $('#addPatient fieldset input#income').val(),
            'occupation': $('#addPatient fieldset input#occupation').val(),
            'education': $('#addPatient fieldset input#education').val(),
            'religion': $('#addPatient fieldset input#religion').val(),
            'maritalStatus': $('#addPatient fieldset input#maritalStatus').val(),
            'noofChildren': $('#addPatient fieldset input#noofChildren').val(),
			
			'smoke': $('#addPatient fieldset input[name=smoke]:checked').val(),
			'chewing': $('#addPatient fieldset input[name=chewing]:checked').val(),
			'snuffing': $('#addPatient fieldset input[name=snuffing]:checked').val(),
			'alcohol': $('#addPatient fieldset input[name=alcohol]:checked').val(),
			'food': $('#addPatient fieldset input[name=food]:checked').val(),
			
			'diabetes': $('#addPatient fieldset input[id=diabetes]:checked').val(),
			'bp': $('#addPatient fieldset input[id=bp]:checked').val(),			
			'tb': $('#addPatient fieldset input[id=tb]:checked').val(),
			'heart_disease': $('#addPatient fieldset input[id=heart_disease]:checked').val(),
			'cancer': $('#addPatient fieldset input[id=cancer]:checked').val(),
			'others': $('#addPatient fieldset input[id=others]:checked').val()
        };
		
		return patient;

	};		

