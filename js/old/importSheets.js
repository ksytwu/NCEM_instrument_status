//Wait for document to load
$(document).ready(function() {
	//Check that "equipment" is in URL
//	if (window.location.href.indexOf("equipment") > -1) {
		//URL to spreadsheet. Read Google Sheets API v4 for details. API key is required.
		var url =
		"https://sheets.googleapis.com/v4/spreadsheets/1P3C6T6280Kfb1NMHNB5_47y5GG1-IE2R6GdPXrHqfuw/values/Sheet1?key=AIzaSyDxvDj_yphgdfZYe-yiumBBV3i3HBBYZAg";
//		if (window.location.pathname.split('/').pop() == 'equipment'){
			//get Json data from URL
			$.getJSON(url, function(data) {
				console.log(data.values);
				//Check how long the json data
				jsonLength = Object.keys(data.values).length;
				//Read each line of the json data
				for (let step = 1; step < jsonLength; step++) {
					//Check if column 5 has data and if div-id for corresponding equipment is available on the page
					checkData = data.values[step][3];
					console.log(checkData);
					checkToolDOM = document.getElementById(data.values[step][3]);
					if (checkData  && checkToolDOM){
						//Remove loader gif
						document.getElementById(data.values[step][3]).getElementsByClassName("loaderChip")[0].classList.remove("loaderChip");
						//Insert status and it's css
						document.getElementById(data.values[step][3]).getElementsByClassName("status")[0].classList.add("equipmentChip");
						
						//$("#" + data.values[step][4]).hide().html(data.values[step][3]).animate({width:'toggle'},500);
						document.getElementById(data.values[step][3]).getElementsByClassName("status")[0].innerHTML = data.values[step][2];
						document.getElementById(data.values[step][3]).getElementsByClassName("training")[0].innerHTML = data.values[step][5];	
						document.getElementById(data.values[step][3]).getElementsByClassName("tech")[0].innerHTML = data.values[step][6];					
						
						
						//If equipment is down (0) ir up (1) change background color accordingly. 0 or 1 is taken from the spreadsheet
						if (data.values[step][4] == 0) {
							document.getElementById(data.values[step][3]).getElementsByClassName("status")[0].style.backgroundColor = '#e85600';
						}
						if (data.values[step][4] == 1) {
							document.getElementById(data.values[step][3]).getElementsByClassName("status")[0].style.backgroundColor = '#32b643';
						}
						if (data.values[step][4] == 2) {
							document.getElementById(data.values[step][3]).getElementsByClassName("status")[0].style.backgroundColor = '#FBBC05';
						}
					}
				}
			});
//		}
//	}
	
});
