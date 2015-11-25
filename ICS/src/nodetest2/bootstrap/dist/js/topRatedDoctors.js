var feedbackListData = [];

$(function() {
	$(document).ready(function(){ 
   	   findTopRatedDoctors();
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

/*
function findTopRatedDoctors() {
	var doctorId="";
	var doctorName="";
	//get the list of all doctors
	$.getJSON( 'http://localhost:3000/users/doctorslist', function( data ) { 
		if(data != null){
			
			for (var i=0; i<data.length; i++) { alert(data[0].firstName);
				doctorId = data[i].email;
				doctorName = data[i].firstName+" "+data[i].lastName;
				var doctor = {'doctorId' : doctorId};
				var ratingValue =0;
				var ratingCount =0;
				var avgRating =0;
				//for each doctor get the list of ratings received
				$.ajax({
					type: "GET",
					url: "http://localhost:3000/doctors/searchDoctorFeedback/",
					dataType: "json",
					data: doctor,
					success: function(data1) { 
						ratingCount = data1.length;
						$.each(data1, function(){
							ratingValue=ratingValue+ this.rating;
						});
						//calculate the average rating for the doctor
						avgRating = ratingValue/ratingCount;
						alert('hey'); alert(doctorId + "," + avgRating);
						//store the doctor name and his avg rating in an object
						var doctorRating = {'doctorName' : doctorName, 'avgRating' : avgRating};
						//add the object to array
						feedbackListData.push(doctorRating);
						feedbackListData.sort(compareRating);
					}
				});
					//$('#listPatient table tbody').html(feedbackListData);
			}
			
		}
	});		
}; */

function findTopRatedDoctors() {
	var doctorId="";
	var doctorName="";
	//get the list of all doctors
	$.getJSON( 'http://localhost:3000/users/doctorslist', function( data ) { 
		if(data != null){
			
				var	tableContent ="<table class='table table-striped table-hover panel-body'>";
				tableContent +="<div id='content'>"
				
			for (var i=0; i<data.length; i++) { 
				doctorId = data[i].email; 
				doctorName = data[i].firstName+" "+data[i].lastName; 
				var doctor = {'doctorId' : doctorId};
				var ratingValue =0;
				var ratingCount =0;
				var avgRating =0;
				
				$.getJSON( 'http://localhost:3000/doctors/searchDoctorFeedback/'+doctorId, function( data ) { 
		
					if (data.msg =='expired')
						window.location = "login.html";
					else
					{ 
						ratingCount = data.length;
					  if(ratingCount > 0) {
						$.each(data, function(){
							ratingValue= +ratingValue +  +this.rating;
						}); 
						//calculate the average rating for the doctor
						avgRating = ratingValue/ratingCount;
						//alert('hey'); alert(data[0].doctorId + "," + avgRating);
						//store the doctor name and his avg rating in an object
						var doctorRating = {'doctorName' : data[0].doctorId, 'avgRating' : avgRating};
						//add the object to array
						feedbackListData = doctorRating;

						tableContent += "<tr class='warning'>";			
						tableContent += '<td>' + feedbackListData.doctorName + '</td>';
						tableContent += '<td>' + feedbackListData.avgRating + '</td>';
						tableContent += '</tr>'; 
						
						tableContent += "</div>";						
						$('#listDoctor table tbody').html(tableContent);
					  }
					}
				});
			}
			
			//tableContent += "</div>";						
			//$('#listDoctor table tbody').html(tableContent);
			
		}
	});		
};

function compareRating(ratingA, ratingB)
{
    return parseFloat(ratingB.avgRating) - parseFloat(ratingA.avgRating);
};

