var userListData = [];

$(function() {
	$(document).ready(function(){  
   	   // Save User button click
	    $('#saveUser').on('click', saveUser); //Submit the form		
		$('#reset').on('click', resetFields); //Reset the form		
		$('#searchUsers').on('change', populateTable); //Populate the table data		
        $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);		
		

	});
});

function resetFields(event) {

    event.preventDefault();
	$('#addUser fieldset input').val('');
	$('#addUser fieldset textarea').val('');
	$('#addUser fieldset input[type=radio]').attr('checked', false);
	$('#addUser fieldset input[type=checkbox]').attr('checked', false);
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

function populateTable() {  
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( 'http://localhost:3000/users/userlist', function( data ) { 
		
		    // Stick our user data array into a userlist variable in the global object
    userListData = data;
	
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.userType + '</td>';
			tableContent += '<td>' + this.firstName + '</td>';
			tableContent += '<td>' + this.lastName + '</td>';
			tableContent += '<td>' + this.dob + '</td>';
			tableContent += '<td>' + this.gender + '</td>';
			tableContent += '<td>' + this.address + '</td>';
			tableContent += '<td>' + this.MobilePhone + '</td>';
            tableContent += '<td>' + this.email + '</td>';		
            tableContent += '<td>' + this.usrdet+ '</a></td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};


function showUserInfo(event) {

    // Prevent Link from Firing
    //event.preventDefault();
   window.location="forms.html";
    // Retrieve username from link rel attribute
    //var thisUserName = $(this).attr('rel');
	// Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];
     
    //Populate Info Box
	//$('#usrtype : :selected').val(thisUserObject.usrtype);
    $('#firstName').val(thisUserObject.firstName);
    $('#lastName').val(thisUserObject.lastName);
    $('#dob').val(thisUserObject.dob);
    $('#gender').val(thisUserObject.gender);
	$('#address').val(thisUserObject.address);
    $('#MobilePhone').val(thisUserObject.MobilePhone);
	$('#email').val(thisUserObject.email);
	$('#usrdet').val(thisUserObject.usrdet);
};

// Add User
function saveUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
	
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
			'userType': $('#addUser fieldset #usrtype :selected').val(),
			'firstName': $('#addUser fieldset input#firstName').val(),
            'lastName': $('#addUser fieldset input#lastName').val(),
            'dob': $('#addUser fieldset input#dob').val(),
            'gender': $('#addUser fieldset input[name=gender]:checked').val(),
			'address': $('#addUser fieldset textarea#address').val(),
			'MobilePhone': $('#addUser fieldset input#MobilePhone').val(),
			'email': $('#addUser fieldset input#email').val(),
		   'usrdet': $('#addUser fieldset textarea#usrdet').val(),
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
                $('#addUser fieldset input').val('');
				$('#addUser fieldset input[type=radio]').attr('checked', false);
				$('#addUser fieldset input[type=checkbox]').attr('checked', false);

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
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
	alert('check3'+ $(this).attr('rel'));
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/users/deleteuser/'+$(this).attr('rel')
        }).done(function( response ) {
			alert('response'+response);
            // Check for a successful (blank) response
			if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable()

        });

    }
    else {

        // If they said no to the confirm, do nothing
		  alert('delete respo false');
        return false;

    }

};