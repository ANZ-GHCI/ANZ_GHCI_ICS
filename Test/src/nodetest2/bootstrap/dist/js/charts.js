// array for rendering chart
var chartData = [];

$(function() {
	$(document).ready(function(){ 
		chart1();
		//chart2();
	});	
});

function chart1() { 

        $.ajax({
        type: "GET",
        url: "http://localhost:3000/patients/analyticsGender"
		}).done(function( data ) {
		alert(data); 
			$.each(data, function(){
					
			});
		  
	  });

	var chart = new CanvasJS.Chart("chartContainer1",
	{
		title:{
			text: "Gender wise"
		},
		legend: {
			maxWidth: 350,
			itemWidth: 120
		},
		data: [
		{
			type: "pie",
			showInLegend: true,
			legendText: "{indexLabel}",
			dataPoints: [
				{ y: 40, indexLabel: "Male" },
				{ y: 60, indexLabel: "Female" }
			]
		}
		]
	});
	chart.render();

 
}; 

function chart2() { 

		$.getJSON( 'http://localhost:3000/patients/analyticsArea', function( data ) { 
			alert(data);
			$.each(data, function(){
					
			});
		
		});

	var chart = new CanvasJS.Chart("chartContainer2",
    {
      title:{
        text: "Area Wise"
      },
      data: [

      {
        dataPoints: [
        { x: 40, label: "Kerala"},
        { x: 20, y: 50,  label: "Gujarath" },
        { x: 30, y: 30,  label: "Andhra"},
        { x: 40, y: 70,  label: "Karnataka"},
        { x: 50, y: 30,  label: "Orissa"},
        { x: 60, y: 40, label: "Jammu"},
        { x: 70, y: 35,  label: "Delhi"},
        { x: 80, y: 45,  label: "Tamilnadu"}
        ]
      }
      ]
    });
	chart.render();

 
}; 