
$(function() {
	$(document).ready(function(){
   	   // check login details button click
	    $('#validateUser').on('click', loginapp); //Submit the form
		
   });
});		
				
$(function() {

    $('#side-menu').metisMenu();

});

function loginapp(event) {
    
	if(!$("#loginform")[0].checkValidity()){  alert('validity check');
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
			alert(data.firstName);
		    if(data != null) {
				window.location="patientlist.html";
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Please check the credentials');
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

