$(function() {
	
	$(document).ready(function() {
	
		if(typeof(Storage) !== "undefined") {
			//alert('ses'+sessionStorage.getItem('usertype'));
			if(!sessionStorage.getItem('usertype')){
				window.location="login.html";					
			}
			// doctor
			if(sessionStorage.getItem('usertype')=='Doctor') {
			//document.getElementById("side-menu").children[1].style.display = "none";
			document.getElementById("menu2").children[0].style.display = "none";
			document.getElementById("side-menu").children[3].style.display = "none";
			document.getElementById("side-menu").children[4].style.display = "none";
			document.getElementById("side-menu").children[6].style.display = "none";
			}
			if(sessionStorage.getItem('usertype')=='Partner') {
			document.getElementById("side-menu").children[1].style.display = "none";
			document.getElementById("menu2").children[0].style.display = "none";
			document.getElementById("side-menu").children[3].style.display = "none";
			document.getElementById("side-menu").children[4].style.display = "none";
			document.getElementById("side-menu").children[6].style.display = "none";
			}
		   
		   // volunteer
		   if(sessionStorage.getItem('usertype')=='Volunteer') {
		    //document.getElementById("side-menu").children[1].style.display = "none";
			document.getElementById("menu2").children[0].style.display = "none";
			document.getElementById("side-menu").children[2].style.display = "none";
			document.getElementById("side-menu").children[3].style.display = "none";		
			}
		}
	});
});
	