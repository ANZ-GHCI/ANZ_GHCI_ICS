var userListData = [];

$(function() {
	$(document).ready(function(){  
   	   // Save User button click
	    populatePartners('partner');
		$('#createCampId').on('click', createCamp); //Submit the form		
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

function populatePartners(partner) {  
		alert(partner);
		$.getJSON( 'http://localhost:3000/users/partnerslist', function( data ) { 
		  if(data != null){
					// given the id of the <select> tag as function argument, it inserts <option> tags
					var partnerElement = document.getElementById(partner);
					partnerElement.length=0;
					partnerElement.options[0] = new Option('Select Partner','-1');
					partnerElement.selectedIndex = 0;
					for (var i=0; i<data.length; i++) {
						partnerElement.options[partnerElement.length] = new Option(data[i].firstName+" "+data[i].lastName,data[i].email);
					}					
			}
		
	});		
}


// update patient
function createCamp(event) {  
    event.preventDefault();
		if(!$("#campCreationForm")[0].checkValidity()){
		 alert("Please enter all mandatory fields");
		return false;
	}
		var campDate=$('#campDate').val().substring(8, 10)+$('#campDate').val().substring(5, 7)+$('#campDate').val().substring(0, 4);
		var campId=$('#placeName').val().substring(0, 5)+campDate;
	        var details = {
			'camp_id': campId,
			'creationDate': $('#assignDoctor fieldset #doctor :selected').val(),
			'campDate': $('#campDate').val()
			};

		var todaysDate = moment(new Date());
		details.createdDate = todaysDate.format('D/M/YYYY');
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: details,
            url: 'http://localhost:3000/users/createCamp',
            dataType: 'JSON'
        }).done(function( response ) {  
		  
			// Check for successful (blank) response
            if (response.msg === '') {
				$("[id=success]").attr('hidden', false);
				$("[id=camp_id]").val(details.camp_id);
				$("#reset").click();
            }
            else {
			    // If something goes wrong, alert the error message that our service returned
				$("[id=failureMsge]").attr('hidden', false);
                
            }
        });
};
