var userListData = [];

$(function() {
	$(document).ready(function(){  
   	   // Save User button click
	    populateDoctors('doctor');
		if($.urlParam('patientid')!=''){
			$('#patientid').val($.urlParam('patientid'));
		}
		$('#validatepatient').on('click', validatepatient); //validate patientID
		$('#doa').on('change',checkAvailability);
		$('#availability').on('click', checkAvailability); //Submit the form	
		$('#assign').on('click', assignDoctor); //Submit the form		
	});
});				
				
$(function() {

    $('#side-menu').metisMenu();

});

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results != null){
	return results[1];
}
	 
};

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

function populateDoctors(doctorId) {  

		$.getJSON( 'http://localhost:3000/users/doctorslist', function( data ) { 
		  if(data != null){
					// given the id of the <select> tag as function argument, it inserts <option> tags
					var doctorElement = document.getElementById(doctorId);
					doctorElement.length=0;
					doctorElement.options[0] = new Option('Select Doctor','-1');
					doctorElement.selectedIndex = 0;
					for (var i=0; i<data.length; i++) {
						doctorElement.options[doctorElement.length] = new Option(data[i].firstName+" "+data[i].lastName,data[i].email);
					}					
			}
		
	});		
}

function validatepatient(event) {
    event.preventDefault();
	var patientid = $('#patientid').val();
	
	if(patientid==''){	
    	alert('Please enter patient ID');
		return false;
	 }
	// Use AJAX to post the object to our adduser service
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/users/patientlist/'+patientid
		
	}).done(function( data ) {
	
	
		// Check for successful (blank) response
		if(data != null && typeof data[0] != 'undefined'){
			// Clear the form inputs
			alert('Valid Patient');
		}
		else {

			// If something goes wrong, alert the error message that our service returned
			alert('Please enter valid patient Id');

		}
	});

};

// update patient
function assignDoctor(event) {  
    event.preventDefault();
	
	        var details = {
			'patient_id': $('#assignDoctor fieldset input#patientid').val(),
			'email': $('#assignDoctor fieldset #doctor :selected').val(),
			'appDate': $('#doa').val(),
			'stTime': $('#stTime').val(),
			'enTime': $('#enTime').val(),
			};

	$.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/patients/assignDoctor',
			data: details
        }).done(function( response ) {
			
            // Check for a successful (blank) response
            if (response.msg === '') {
				$("[id=success]").attr('hidden', false);
			}
            else {
                $("[id=failure]").attr('hidden', false);
            }

        });
};

function checkAvailability(event) {  
    event.preventDefault();
	
	        var details = {
			'patient_id': $('#assignDoctor fieldset input#patientid').val(),
			'email': $('#assignDoctor fieldset #doctor :selected').val(),
			'appDate': $('#doa').val()
		};

	$.ajax({
            type: 'POST',
            url: 'http://localhost:3000/doctors/checkAppointment',
			data: details
        }).done(function( data ) {
			 if(data != null){
					// given the id of the <select> tag as function argument, it inserts <option> tags
					var stTimeElement = document.getElementById('stTime');
					var enTimeElement = document.getElementById('enTime');
					stTimeElement.length=0;
					stTimeElement.options[0] = new Option('Select Star Time','-1');
					stTimeElement.selectedIndex = 0;
					enTimeElement.length=0;
					enTimeElement.options[0] = new Option('Select End Time','-1');
					enTimeElement.selectedIndex = 0;
					for (var i=0; i<data.length; i++) {
						stTimeElement.options[stTimeElement.length] = new Option(data[i].stTime,data[i].stTime);
						enTimeElement.options[enTimeElement.length] = new Option(data[i].enTime,data[i].enTime);
					}					
			}
          
        });
};