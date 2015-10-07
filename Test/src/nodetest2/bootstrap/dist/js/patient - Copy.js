var userListData = [];

$(function() {
	$(document).ready(function(){ 
	    // Username link click
   	   // Add User button click
	    $('#btnAddPatient').on('click', addPatient); //Submit the form
		//$("#btnAddPatient").submit(function(e){
			//showUserInfo();
		//});


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

function showUserInfo(event) {

    // Prevent Link from Firing
    //event.preventDefault();
   window.location="forms.html";
    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');
	// Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];
     alert($('#userInfoName').attr('value'));
    //Populate Info Box
    $('#userInfoName').val(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};

// Add User
function addPatient(event) { 
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addPatient input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
	alert('passed check1');
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addPatient fieldset input#inputUserName').val(),
            'email': $('#addPatient fieldset input#inputUserEmail').val(),
            'fullname': $('#addPatient fieldset input#inputUserFullname').val(),
            'age': $('#addPatient fieldset input#inputUserAge').val(),
            'location': $('#addPatient fieldset input#inputUserLocation').val(),
            'gender': $('#addPatient fieldset input#inputUserGender').val()
        }
		
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: 'http://localhost:3000/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {  

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addPatient fieldset input').val('');

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

