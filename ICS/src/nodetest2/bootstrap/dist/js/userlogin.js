
$(function() {
	$(document).ready(function(){
		// on load login should be seen and password reset screen should be hidden
		$('#passwordreset').hide();
		$('#invalidentry').hide();
		$('#invalidlogin').hide();
		$('#resetSuccess').hide();
	    // check login details button click
	    $('#validateUser').on('click', loginapp); //Submit the form
		// on password reset only the password reset screen should be shown
		$('#passwordReset').on('click', resetPassword);
		//Reset Password 
		$('#newPassword').on('click', newPasswordReset);		
   });
});		

// this is added since in cloud the second div for feedback is visible on form load and then collapses
window.onload = function() {
		$('#passwordreset').hide();
		$('#invalidentry').hide();
		$('#invalidlogin').hide();
		$('#resetSuccess').hide();
};
				
function resetPassword() {
		event.preventDefault();
		$('#signin').hide();
		$('#passwordreset').show();
};

function newPasswordReset() {
	    event.preventDefault();
		if($('#login fieldset input#password1').val() != $('#login fieldset input#password2').val()){
			alert ('Both the password should be the same');
		}else{
							
				var todaysDate = moment(new Date());
				var updatedDate = todaysDate.format('D/M/YYYY');							

				var updateUserPassword = {
					'email': $('#login fieldset input#email').val(),
					'password': $('#login fieldset input#password1').val(),
					'sid':$('#login fieldset input#sid').val(),
					'updatedDate':updatedDate	
				 };
				 
					// Use AJAX to post the object to our adduser service
					$.ajax({
						type: 'PUT',
						url: 'http://localhost:3000/users/edituser/'+updateUserPassword.email,
						data: updateUserPassword
					}).done(function( response ) {
						
						// Check for successful (blank) response
						if (response.msg === '') { 
							alert('SuccessFully changed Password');
							window.location="login.html";
						}
						else {
							$('#invalidlogin').show();
							$('div#invalidlogin').html('Please check the User Id and SID');
							$("#reset").click();
						}
					});
						
		}
};

$(function() {

    $('#side-menu').metisMenu();

});

function loginapp(event) { 

	if(!$("#loginform")[0].checkValidity()){  
		return false;
	}
	event.preventDefault();
	
        // If it is, compile all user info into one object
        var credentials = {
			'username': $('#login fieldset input#username').val(),
			'password': $('#login fieldset input#password').val()
         };
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: credentials,
            url: 'http://localhost:3000/users/login',
			dataType: 'JSON',
			success: function(data) {
			   if(data != null) {
				if(typeof(Storage) !== "undefined") {
				
				sessionStorage.setItem('usertype', data.userType);
				}
					   if(data.userType == "ICS Admin") { window.location="index.html"; }
					   else if(data.userType == "ICS Staff") { window.location="index.html"; }
					   else if(data.userType == "Volunteer") { window.location="patient-registration.html"; }
					   else if(data.userType == "Partner") {  
					   window.location="patientlist-search.html?assignedDoctor="+ $('#login fieldset input#username').val();
					   }
					   else if(data.userType == "Doctor") { //window.location="patientlist.html";
						 window.location="patientlist.html?assignedDoctor="+ $('#login fieldset input#username').val();
					   }
					   
			   } else {
					// If something goes wrong, alert the error message that our service returned
					$('#invalidlogin').show();
			     	$('div#invalidlogin').html('Invalid credentials or click on forgot password if you know your SID');
			   }
			}
        });
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

