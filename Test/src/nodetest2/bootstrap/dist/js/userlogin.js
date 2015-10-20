var patientListData = [];

$(function() {
	$(document).ready(function(){
   	   // check login details button click
	    $('#userLogin').on('click', loginapp); //Submit the form
		
   });
});

function resetFields(event) {
event.preventDefault();
	$('#addPatient fieldset input').val('');
	$('#addPatient fieldset input[type=radio]').attr('checked', false);
	$('#addPatient fieldset input[type=checkbox]').attr('checked', false);
	
}				
				
$(function() {

    $('#side-menu').metisMenu();

});

function loginapp(event) {
    event.preventDefault();


    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
	alert('passed check1');
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
			'username': $('#login fieldset input#username').val(),
			'password': $('#login fieldset input#password').val(),
         }
	
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: 'http://localhost:3000/users/login',
			dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#login fieldset input').val('');
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
    var arrayPosition = patientListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = patientListData[arrayPosition];
     alert($('#firstName').attr('value'));
    //Populate Info Box
    $('#firstName').val(thisUserObject.firstName);
    $('#lastName').val(thisUserObject.lastName);
    $('#dob').val(thisUserObject.dob);
    $('#gender').val(thisUserObject.gender);
    $('#homePhone').val(thisUserObject.homePhone);
    $('#MobilePhone').val(thisUserObject.MobilePhone);
    $('#income').val(thisUserObject.income);
    $('#occupation').val(thisUserObject.occupation);
    $('#education').val(thisUserObject.education);
    $('#religion').val(thisUserObject.religion);
    $('#maritalStatus').val(thisUserObject.maritalStatus);
    $('#noofChildren').val(thisUserObject.noofChildren);

};
