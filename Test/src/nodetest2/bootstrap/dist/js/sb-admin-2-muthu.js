var userListData = [];

$(function() {
	$(document).ready(function(){
	    // Username link click
   
		var tableContent = '';
		 $.getJSON('http://localhost:3000/users/userlist', function( data ) {
	//    userListData = data;
		// For each item in our JSON, add a table row and cells to the content string
			userListData = data;
			$.each(data, function(){
				tableContent += '<tr>';
				tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
				tableContent += '<td>' + this.email + '</td>';
				tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
				tableContent += '<td>'+ this.location + '</td>';
				tableContent += '</tr>';
			});
			
			$('#dataTables-patients tbody').html(tableContent);
		});
		 $('#dataTables-patients tbody').on('click', 'td a.linkshowuser', showUserInfo);
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
