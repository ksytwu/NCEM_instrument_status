//Wait for document to load
$(document).ready(function() {
	//Check that "equipment" is in URL
	//	if (window.location.href.indexOf("equipment") > -1) {
		//URL to spreadsheet. Read Google Sheets API v4 for details. API key is required.
		var url = "https://sheets.googleapis.com/v4/spreadsheets/1vFCFc8iY_T_sbpf28a53BOJnyu7d_u_KMQ3-bOiANkU/values/Sheet1?key=AIzaSyBecqyRz-4KVKPwskq1ERj9YJNvtJgoJ5k";
		//var url = "https://sheets.googleapis.com/v4/spreadsheets/1P3C6T6280Kfb1NMHNB5_47y5GG1-IE2R6GdPXrHqfuw/values/Sheet1?key=AIzaSyDxvDj_yphgdfZYe-yiumBBV3i3HBBYZAg";

		$.getJSON(url, function(data) {
			console.log(data.values);
			
			
			//Check how long the json data
			jsonLength = Object.keys(data.values).length;
			//Read each line of the json data
			for (let step = 2; step < jsonLength; step++) { 
				
				//Check if tool id is not empty
				if (data.values[step][6]) {
					
					//Add section name ONCE
					checkToolDOM = document.getElementById(data.values[step][0]);
					var sectionClass = data.values[step][0].replace(' ','_').replace('.','_'); // remove spaces from section name to parse as sectionID
					
					if (checkToolDOM == null) {
						$("#tableBody").append('<tr id="'+data.values[step][0]+'" class="table-secondary td-left '+sectionClass+'"><th scope"row" colspan="5">'+data.values[step][0]+'</th></tr>');
					}
					
					//Populate section with tools
					var mainToolInfo = '<tr id="note-'+data.values[step][6]+'" class="'+sectionClass+'"><td id="'+data.values[step][6]+'">'+data.values[step][1]+'</td><td class="td-center"><p class="equipmentChip status-'+data.values[step][7]+'">'+data.values[step][2]+'</p></td><td class="td-center">'+data.values[step][3]+'</td><td class="td-center">'+data.values[step][4]+'</td><td class="td-center">'+data.values[step][5]+'</td></tr>'
					
					//if (data.values[step][6]) {
					//	var ToolNote = '<tr id="note-'+data.values[step][6]+'" class="noteTr '+sectionClass+'"><td class="tdNote" colspan="4"><i class="fa-regular fa-note-sticky"></i> '+data.values[step][3]+'</td></tr>'
					//	$("."+sectionClass).last().after(mainToolInfo+ToolNote);
						
					//} else {
					//	$("."+sectionClass).last().after(mainToolInfo);
					//}
					$("."+sectionClass).last().after(mainToolInfo);
					
					//Find tools with notes and add notes

					//Find tools with calendar links and add icons with links
					//if (data.values[step][7]){
					//	document.getElementById(data.values[step][3]).innerHTML += '<a href="'+data.values[step][7]+'" target="_blank"><i class="fa-regular fa-calendar-plus iconMargin"></i></a>';
					//}
					// 					//Find tools with note and add icons with button function
					//if (data.values[step][8]){
					//	document.getElementById(data.values[step][3]).innerHTML += '<a class="note closeButton" href="#/"><i class="fa-solid fa-circle-info iconMargin"></i></a>';
					//}
				}
			}
			if (data.values[0][1] != null){
				$("#generalAnnouncements").html(' ');
				if (data.values[0][1]) {
					$("#generalAnnouncements").append(' '+data.values[0][1]);
				}				
				$("#generalAnnouncements").show()
			//	$(".equipmentChip").css("background-color","gray")
			//	$(".fa-regular, .fa-solid").css("color","gray")
			}
		}).done(function() {
			$("#loading").slideUp('slow');
		});
		
		//Add toggle functionality to note-buttons
		$(document).on('click', 'a.closeButton', function() {
			$(this).parents("tr").toggleClass("noteRed");
			$(this).parents("tr").next().toggle();
			//console.log('click');
		});
	});		