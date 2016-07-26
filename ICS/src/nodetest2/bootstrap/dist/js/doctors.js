// Userlist data array for filling in info box
var doctorListData = [];

$(function() {
	$(document).ready(function(){ 
		
   	   // fetch patient list assigned to doctor
		populatePatientTable();
		$("#userid").val($.urlParam('userid'));
		// block free time on link click
   	 $('#saveAppointment').on('click', saveAppointment); //Submit the form
//		 $('#listPatient table tbody').on('click', 'td a.linkClinicalInfo', fetchPatientdet);	
	$('#searchPatients').on('click', searchPatients); 	
	});
});	

$.urlParam = function(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	
	if(results != null) {  	
		return results[1];	
	 }
	 

};

function populatePatientTable() {  

    // jQuery AJAX call for JSON
	$.getJSON( 'http://localhost:3000/patients/patientlistdet/'+$.urlParam('assignedDoctor'), function( data ) { 
		
	if (data.msg =='expired')
		window.location = "login.html";
	else
	{
		// Stick our user data array into a userlist variable in the global object
		var patientListData = data; 
		
     	//foreach(h=0;h<patientListData.length;h++){}
	     var i=0; var tot = patientListData.length; var j = (tot - (tot % 5)) / 5; var k =5; var num=0;
				
			//	table(num,k,i);

				if(tot!=0) {
				function table(num,k,i) {

					var	tableContent ="<table class='table table-striped table-hover panel-body'>";
						tableContent +="<div id='content'>"
			
					while (i < k && i < tot) {
				
						tableContent += "<tr class='warning'>";			
																
						tableContent += '<td><a href="#" id="fetchPatient" class="linkClinicalInfo" rel="' + patientListData[i].patient_id + '">' + patientListData[i].patient_id + '</a></td>';											
						tableContent += '<td>' + patientListData[i].firstName + '</td>';
						tableContent += '<td>' + patientListData[i].lastName + '</td>';
						tableContent += '<td>' + patientListData[i].dob + '</td>';
						tableContent += '<td>' + patientListData[i].gender + '</td>';
						tableContent += '<td>' + patientListData[i].address + '</td>';
						tableContent += '<td>' + patientListData[i].MobilePhone + '</td>';
						tableContent += '<td>' + patientListData[i].email + '</td>';		
						tableContent += '<td><a href="#" id="fetchPatient" class="linkClinicalInfo" rel="' + patientListData[i].patient_id + '">' + patientListData[i].patient_id + '</a></td>';
						tableContent += '</tr>';  
						i = i+1;
					}
				
					tableContent += "</div>";
					// Inject the whole content string into our existing HTML table
					$('#listPatient table tbody').html(tableContent);
					return;
				}
				   table(num,k,i); //call to function table defined above for the first time
				
				   // call to paginator function
					$('#page-selection').bootpag({
						total: (j+1)
						//page: (j+1)
					}).on("page", function(event, num){											
											
							//alert('num'+num);
							k= 5*num ; i=(5*num)-5;
							//alert('num:'+num+' K:'+k+' J:'+j);
							if(i < tot) { table(num,k,i); }
					 //$("#ListPatient table tbody").html(tableContent); 
					});	
				} else { 
				   //alert('No patients assigned ...'); 
				}
	}
	});
}; 


function searchPatients() { 
	var param1='';
	var method='';
	
	var campid=$('#campId').val();
	var fromdate=$('#from_date').val();
	var todate=$('#to_date').val();
	if($.trim(campid)==''  && (fromdate=='' && todate=='') ){
	  alert("Please enter search criteria");
	}else if($.trim(campid)==''  && (fromdate=='' || todate=='') ){
		alert("enter both the dates");
	}else if((fromdate=='' && todate!='') || (fromdate!='' && todate=='')){
		alert("Please enter both the dates");
	}else if($.trim(campid)!=''  && (fromdate!='' && todate!='') ){
	  alert("Please enter only one criteria");
	}

	if($.trim(campid)!=''){
	 param1=$.trim(campid);
	 method="patientlistbycamp";
	}else{
	 param1=fromdate+"*"+todate;
	 method="patientlistbyDate";	 
	}
	alert(param1+":"+param2+":"+param3);

    // jQuery AJAX call for JSON
	$.getJSON( 'http://localhost:3000/patients/'+method'/'+param1, function( data ) { 
	
	if (data.msg =='expired')
		window.location = "login.html";
	else
	{
		// Stick our user data array into a userlist variable in the global object
		var patientListData = data; 
		
     	//foreach(h=0;h<patientListData.length;h++){}
	     var i=0; var tot = patientListData.length; var j = (tot - (tot % 5)) / 5; var k =5; var num=0;
				
			//	table(num,k,i);

				if(tot!=0) {
				function table(num,k,i) {

					var	tableContent ="<table class='table table-striped table-hover panel-body'>";
						tableContent +="<div id='content'>"
			
					while (i < k && i < tot) {
				
						tableContent += "<tr class='warning'>";			
																
						tableContent += '<td><a href="#" id="fetchPatient" class="linkClinicalInfo" rel="' + patientListData[i].patient_id + '">' + patientListData[i].patient_id + '</a></td>';											
						tableContent += '<td>' + patientListData[i].firstName + '</td>';
						tableContent += '<td>' + patientListData[i].lastName + '</td>';
						tableContent += '<td>' + patientListData[i].dob + '</td>';
						tableContent += '<td>' + patientListData[i].gender + '</td>';
						tableContent += '<td>' + patientListData[i].address + '</td>';
						tableContent += '<td>' + patientListData[i].MobilePhone + '</td>';
						tableContent += '<td>' + patientListData[i].email + '</td>';		
						tableContent += '<td><a href="#" id="fetchPatient" class="linkClinicalInfo" rel="' + patientListData[i].patient_id + '">' + patientListData[i].patient_id + '</a></td>';
						tableContent += '</tr>';  
						i = i+1;
					}
				
					tableContent += "</div>";
					// Inject the whole content string into our existing HTML table
					$('#listPatient table tbody').html(tableContent);
					return;
				}
				   table(num,k,i); //call to function table defined above for the first time
				
				   // call to paginator function
					$('#page-selection').bootpag({
						total: (j+1)
						//page: (j+1)
					}).on("page", function(event, num){											
											
							//alert('num'+num);
							k= 5*num ; i=(5*num)-5;
							//alert('num:'+num+' K:'+k+' J:'+j);
							if(i < tot) { table(num,k,i); }
					 //$("#ListPatient table tbody").html(tableContent); 
					});	
				} else { 
				   //alert('No patients assigned ...'); 
				}
	}
	});
}; 



// fetchPatient details
function fetchPatientdet(event) {  
	
	var patient_Id= $('#fetchPatient').attr('rel');
			
	var patient = {'patient_id' : $(this).attr('rel')};

	window.location="clinicalExamination.html?patientid='"+ $(this).attr('rel') +"'";
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


// Fill table with data
function populateTable111() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/doctors/doctorlist', function( data ) {
		// Stick our user data array into a userlist variable in the global object
    doctorListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};


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
function addDoctor(event) { 
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
		
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: 'http://localhost:3000/doctors/adddoctor',
            dataType: 'JSON'
        }).done(function( response ) {  

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
// Save Appointment
function saveAppointment(event)
{
event.preventDefault();
	
	        var details = {
			'doctor_id': $('input#userid').val(),
			'appDate': $('#doa').val(),
			'stTime': $('#stTime').val(),
			'enTime': $('#enTime').val(),
			'patient_id' : ''
			};
		var todaysDate = moment(new Date());
		details.createdDate = todaysDate.format('D/M/YYYY');
	$.ajax({
            type: 'POST',
            url: 'http://localhost:3000/doctors/blockAppointment',
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
}


