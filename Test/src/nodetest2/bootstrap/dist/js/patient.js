var patientListData = [];

$(function() {
	$(document).ready(function(){
		$('#savePatient').on('click', function(event){
		
			if($('#identifier').val()!=''){	
				updatePatient(event);//Update patient
			}else{
				savePatient(event); //Add the patient
			}	
		});
		$('#searchPatient').on('click', findPatient); //searchPatient
		$('#clinicalInfo').on('click', function(event) {
			window.location="clinicalExamination.html?patientid='"+ $('#patient_id').val() +"'";
		}); //Navigate to clinical info
	});
});
			
				
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

function populateTable() {  
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( 'http://localhost:3000/patients/patientlist', function( data ) { 
		
		    // Stick our user data array into a userlist variable in the global object
    patientListData = data;
	
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            
			tableContent += '<td>' + this.firstName + '</td>';
			tableContent += '<td>' + this.lastName + '</td>';
			tableContent += '<td>' + this.dob + '</td>';
			tableContent += '<td>' + this.gender + '</td>';
			tableContent += '<td>' + this.address + '</td>';
			tableContent += '<td>' + this.MobilePhone + '</td>';
            tableContent += '<td>' + this.email + '</td>';		
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">Info</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

function findPatient(event) {
	// Prevent Link from Firing
   event.preventDefault();
   //window.location="patient-registration.html";
        $.ajax({
        type: "GET",
        url: "http://localhost:3000/patients/searchPatient/"+$('#patientid').val()
		}).done(function( data ) {
		alert(data); 
		  if(data != null){
			
			var thisUserObject = data;
			
			$('#identifier').val(thisUserObject._id);
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
			$('[name=maritalStatus]').val(thisUserObject.maritalStatus);
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
		    
			
		} else{
		
			alert('error data not found');
		}	
		
		
});

}


// Add User
function savePatient(event) {
    alert('add');
	// Super basic validation - increase errorCount variable if any fields are blank
	if(!$("#patientRegistrationForm")[0].checkValidity()){
		return false;
	}
	event.preventDefault();
	// Check and make sure errorCount's still at zero
            // If it is, compile all user info into one object
        var newPatient = preparePatientJson();
		var datestring = newPatient.dob.substring(8, 10)+newPatient.dob.substring(5, 7)+newPatient.dob.substring(0, 4);
		newPatient.patient_id = newPatient.firstName.substring(0, 4)+newPatient.lastName.substring(0,1)+datestring;
		var todaysDate = moment(new Date());
		newPatient.createdDate = todaysDate.format('D/M/YYYY');
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newPatient,
            url: 'http://localhost:3000/patients/addpatient',
            dataType: 'JSON'
        }).done(function( response ) {  
		  alert('response : '+response);
			// Check for successful (blank) response
            if (response.msg === '') {
				$("[id=alertmsge]").attr('hidden', false);
				$("[id=patient_id]").val(newPatient.patient_id);
				$("#reset").click();
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
	if(!$("#patientRegistrationForm")[0].checkValidity()){
		return false;
	}
    var patientDetails = preparePatientJson();	  
	var datestring = patientDetails.dob.substring(8, 10)+patientDetails.dob.substring(5, 7)+patientDetails.dob.substring(0, 4);
	patientDetails.patient_id = patientDetails.firstName.substring(0, 4)+patientDetails.lastName.substring(0,1)+datestring;	
	var todaysDate = moment(new Date());
	patientDetails.updatedDate = todaysDate.format('D/M/YYYY');
		
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/patients/updatepatient/' + $('#identifier').val(),
			data: patientDetails
        }).done(function( response ) {
			
            // Check for a successful (blank) response
            if (response.msg === '') {
				$("[id=alertmsge]").attr('hidden', false);
				$("[id=patient_id]").val(patientDetails.patient_id);
				$("#reset").click();          
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
            'maritalStatus': $('#addPatient fieldset input[name=maritalStatus]:checked').val(),
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

