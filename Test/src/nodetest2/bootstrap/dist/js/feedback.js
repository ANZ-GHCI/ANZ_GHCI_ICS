var feedbackListData = [];
var rating = 0;

$(function() {
	$(document).ready(function(){ 
   	   // fetch doctors list and populate in dropdown
		
		$('#submitFeedback').on('click', submitDoctorFeedback);
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

function findDoctorFeedback(event) {
	event.preventDefault();
	var doctor = {'doctorId' : $('#doctorDropDown').val()};

	$.ajax({
		type: "GET",
		url: "http://localhost:3000/doctors/searchDoctorFeedback/",
		dataType: "json",
		data: doctor,
		success: function(data) { 
			feedbackListData = data;
			var thisUserObject = feedbackListData[0];
			if(thisUserObject !=null) {
				return thisUserObject.ratingValue;
			}
		}
	});
};

function submitDoctorFeedback(event) {
		alert('submit');
        // If it is, compile all user info into one object
        var newDoctorFeedback = {
			'patient_id': $('#patientid').val(),
			'doctorId':$('#doctor :selected').val(),
			'rating':$('#ratingValue').val()
        }
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newDoctorFeedback,
            url: 'http://localhost:3000/doctors/doctorsFeedback',
            dataType: 'JSON'
        }).done(function( response ) {
            // Check for successful (blank) response
            // Check for a successful (blank) response
            if (response.msg === '') {
				$("[id=success]").attr('hidden', false);
			}
            else {
                $("[id=failure]").attr('hidden', false);
            }
        });
};
