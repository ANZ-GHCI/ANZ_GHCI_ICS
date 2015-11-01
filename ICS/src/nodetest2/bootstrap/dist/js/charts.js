// array for rendering chart
var chartData = [];

$(function() {
	$(document).ready(function(){ 
		genderAnalytics();
		areaAnalytics();
		
	});	
});

function genderAnalytics() { 
	var chartsData = [];
	$.getJSON( 'http://localhost:3000/patients/analyticsGender', function( analytics ) { 
	if(analytics != null) {
			for (i = 0; i < analytics.length; i++) {
				chartsData[i] = {y : analytics[i].count,  indexLabel: analytics[i]._id};
				
			};
			var chart = new CanvasJS.Chart("chartContainer1",
			{	zoomEnabled: true,
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
						indexLabelFontSize: 26,
						legendText: "{indexLabel}",
						dataPoints: chartsData
					}
				]
			});
			chart.render();
	} else {
			
	}
});
 
}; 

function areaAnalytics() { 
	var chartsData = [];
	$.getJSON( 'http://localhost:3000/patients/analyticsArea', function( analytics ) { 
	if(analytics != null) {
			for (i = 0; i < analytics.length; i++) {
				chartsData[i] = {y : analytics[i].count,  label: analytics[i]._id};
				
			};
	var chart = new CanvasJS.Chart("chartContainer2",
    { zoomEnabled: true,
      title:{
        text: "Area Wise"
	  },
		axisY: {
			labelFontSize: 20,
			labelFontColor: "dimGrey"
		},
		axisX: {
			labelAngle: -30
		},
      data: [

      { indexLabelFontSize: 26,
        dataPoints: chartsData 
      }
      ]
    });
	chart.render();
	} else {
			
	}
});
 
}; 
