var clinicalExamListData = [];

$(function() {
	$(document).ready(function(){
   	   // Save patient button click
	    $('#submitClinicalExam').on('click', submitClinicalExam); //Submit the form
		
		$('#reset').on('click', resetFields); //Submit the form

		

	});
});

function resetFields(event) {
event.preventDefault();
	$('#addClinicalExam fieldset input').val('');
	$('#addClinicalExam fieldset input[type=radio]').attr('checked', false);
	$('#addClinicalExam fieldset input[type=checkbox]').attr('checked', false);
	
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

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/patients/clinicalExamList', function( data ) {
		// Stick our user data array into a userlist variable in the global object
    clinicalExamListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.CVSTxt + '</td>';
            tableContent += '<td>' + this.PulseTxt + '</td>';
            tableContent += '<td>' + this.BPTxt + '</td>';
			tableContent += '<td>' + this.RSTxt + '</td>';
			tableContent += '<td>' + this.LiverTxt + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#dataTables-example tbody').html(tableContent);
    });
};

function showClinicalExamInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();
   
    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');
	
	// Get Index of object based on id value
    var arrayPosition = clinicalExamListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = clinicalExamListData[arrayPosition];
	
     alert($('#CVSTxt').attr('value'));
    //Populate Info Box
    $('#CVSTxt').val(thisUserObject.CVSTxt);
    $('#PulseTxt').val(thisUserObject.PulseTxt);
    $('#BPTxt').val(thisUserObject.BPTxt);
    $('#RSTxt').val(thisUserObject.RSTxt);
    $('#LiverTxt').val(thisUserObject.LiverTxt);
    $('#SpleenTxt').val(thisUserObject.SpleenTxt);
    $('#LymphTxt').val(thisUserObject.LymphTxt);
    $('#BreastsTxt').val(thisUserObject.BreastsTxt);
    $('#ThyroidTxt').val(thisUserObject.ThyroidTxt);
    $('#BonesTxt').val(thisUserObject.BonesTxt);
    $('#TestesTxt').val(thisUserObject.TestesTxt);
    $('#PRTxt').val(thisUserObject.PRTxt);
	$('#PATxt').val(thisUserObject.PATxt);
	$('#PharynxTxt').val(thisUserObject.PharynxTxt);
	$('#LarynxTxt').val(thisUserObject.LarynxTxt);
	$('#TongueTxt').val(thisUserObject.TongueTxt);
	$('#MenarcheTxt').val(thisUserObject.MenarcheTxt);
	$('#MarriageTxt').val(thisUserObject.MarriageTxt);
	$('#DeliveryTxt').val(thisUserObject.DeliveryTxt);
	$('#LastDeliveryTxt').val(thisUserObject.LastDeliveryTxt);
	$('#MenopauseTxt').val(thisUserObject.MenopauseTxt);
	
	$('#PregNumTxt').val(thisUserObject.PregNumTxt);
	$('#StillBirthTxt').val(thisUserObject.StillBirthTxt);
	$('#AbortNumTxt').val(thisUserObject.AbortNumTxt);
	$('#ChildNumTxt').val(thisUserObject.ChildNumTxt);
	$('#BreastFeedTxt').val(thisUserObject.BreastFeedTxt);
	$('#BottleFeedTxt').val(thisUserObject.BottleFeedTxt);

};

function submitClinicalExam(event) {
    event.preventDefault();

        // If it is, compile all user info into one object
        var newClinicalExam = {
            'CVSTxt': $('#addClinicalExam fieldset input#CVSTxt').val(),
            'PulseTxt': $('#addClinicalExam fieldset input#PulseTxt').val(),
            'BPTxt': $('#addClinicalExam fieldset input#BPTxt').val(),
            'RSTxt': $('#addClinicalExam fieldset input#RSTxt').val(),
			'LiverTxt': $('#addClinicalExam fieldset input#LiverTxt').val(),
            'SpleenTxt': $('#addClinicalExam fieldset input#SpleenTxt').val(),
            'LymphTxt': $('#addClinicalExam fieldset input#LymphTxt').val(),
            'BreastsTxt': $('#addClinicalExam fieldset input#BreastsTxt').val(),
            'ThyroidTxt': $('#addClinicalExam fieldset input#ThyroidTxt').val(),
            'BonesTxt': $('#addClinicalExam fieldset input#BonesTxt').val(),
            'TestesTxt': $('#addClinicalExam fieldset input#TestesTxt').val(),
            'PRTxt': $('#addClinicalExam fieldset input#PRTxt').val(),
            'PATxt': $('#addClinicalExam fieldset input#PATxt').val(),
			'PharynxTxt': $('#addClinicalExam fieldset input#PharynxTxt').val(),
            'LarynxTxt': $('#addClinicalExam fieldset input#LarynxTxt').val(),
            'TongueTxt': $('#addClinicalExam fieldset input#TongueTxt').val(),
            'MenarcheTxt': $('#addClinicalExam fieldset input#MenarcheTxt').val(),
            'MarriageTxt': $('#addClinicalExam fieldset input#MarriageTxt').val(),
            'DeliveryTxt': $('#addClinicalExam fieldset input#DeliveryTxt').val(),
            'LastDeliveryTxt': $('#addClinicalExam fieldset input#LastDeliveryTxt').val(),
			'MenopauseTxt': $('#addClinicalExam fieldset input#MenopauseTxt').val(),
			
			'PregNumTxt': $('#addClinicalExam fieldset input#PregNumTxt').val(),
            'StillBirthTxt': $('#addClinicalExam fieldset input#StillBirthTxt').val(),
            'AbortNumTxt': $('#addClinicalExam fieldset input#AbortNumTxt').val(),
            'ChildNumTxt': $('#addClinicalExam fieldset input#ChildNumTxt').val(),
            'BreastFeedTxt': $('#addClinicalExam fieldset input#BreastFeedTxt').val(),
			'BottleFeedTxt': $('#addClinicalExam fieldset input#BottleFeedTxt').val(),
			
			'cycle': $('#addClinicalExam fieldset input[name=cycle]:checked').val(),
			'discharge': $('#addClinicalExam fieldset input[name=discharge]:checked').val(),
			'postMenopause': $('#addClinicalExam fieldset input[name=postMenopause]:checked').val(),
			'postCoital': $('#addClinicalExam fieldset input[name=postCoital]:checked').val(),
			'interMenstrual': $('#addClinicalExam fieldset input[name=interMenstrual]:checked').val(),
			
			'fpLoop': $('#addClinicalExam fieldset input[name=fpLoop]:checked').val(),
			'fpPills': $('#addClinicalExam fieldset input[name=fpPills]:checked').val(),
			'fpTubectomy': $('#addClinicalExam fieldset input[name=fpTubectomy]:checked').val(),
			'fpVasectomy': $('#addClinicalExam fieldset input[name=fpVasectomy]:checked').val(),
			'fpOthersTxt': $('#addClinicalExam fieldset input#fpOthersTxt').val(),
			
			'geHealth': $('#addClinicalExam fieldset input[name=geHealth]:checked').val(),
			'geCervicitis': $('#addClinicalExam fieldset input[name=geCervicitis]:checked').val(),
			'geBleedingTxt': $('#addClinicalExam fieldset input#geBleedingTxt').val(),
			'geGrowthTxt': $('#addClinicalExam fieldset input#geGrowthTxt').val(),
			'geAbnormalTxt': $('#addClinicalExam fieldset input#geAbnormalTxt').val(),
			
			'ecg': $('#addClinicalExam fieldset input[id=ecg]:checked').val(),
			'chestXRay': $('#addClinicalExam fieldset input[id=chestXRay]:checked').val(),			
			'baSwallow': $('#addClinicalExam fieldset input[id=baSwallow]:checked').val(),
			'fnac': $('#addClinicalExam fieldset input[id=fnac]:checked').val(),
			'biopsy': $('#addClinicalExam fieldset input[id=biopsy]:checked').val(),
			'papsmear': $('#addClinicalExam fieldset input[id=papsmear]:checked').val(),
			'ecto': $('#addClinicalExam fieldset input[id=ecto]:checked').val(),
			'endo': $('#addClinicalExam fieldset input[id=endo]:checked').val(),
			'postFX': $('#addClinicalExam fieldset input[id=postFX]:checked').val(),
			
			'cdNormalTxt': $('#addClinicalExam fieldset input#cdNormalTxt').val(),
			'cdBeginningTxt': $('#addClinicalExam fieldset input#cdBeginningTxt').val(),
			'cdPreCancerTxt': $('#addClinicalExam fieldset input#cdPreCancerTxt').val(),
			'cdSuspiciousTxt': $('#addClinicalExam fieldset input#cdSuspiciousTxt').val(),
			'cdDetectedTxt': $('#addClinicalExam fieldset input#cdDetectedTxt').val()
        }
		alert('newClinicalExam'+newClinicalExam.CVSTxt);
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newClinicalExam,
            url: 'http://localhost:3000/patients/addClinicalExam',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
				alert('Success');
                // Clear the form inputs
                $('#addClinicalExam fieldset input').val('');
				$('#addClinicalExam fieldset input[type=radio]').attr('checked', false);
				$('#addClinicalExam fieldset input[type=checkbox]').attr('checked', false);
				
				// Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
};