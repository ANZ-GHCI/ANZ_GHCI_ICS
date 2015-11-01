
//States

var assdoc_arr = new Array("Doctor 1", "Doctor 2", "Doctor 3", "Doctor 4", "Doctor 5", "Doctor 6"); 


function populateDoctors(assdocElementId){
	// given the id of the <select> tag as function argument, it inserts <option> tags
	var assdocElement = document.getElementById(assdocElementId);
	assdocElement.length=0;
	assdocElement.options[0] = new Option('Select Doctor','-1');
	assdocElement.selectedIndex = 0;
	for (var i=0; i<assdoc_arr.length; i++) {
		assdocElement.options[assdocElement.length] = new Option(assdoc_arr[i],assdoc_arr[i]);
	}

	// Assigned all countries. Now assign event listener for the states.

}