// vyJbstfN67fxuU2HQQeqy79ZcURuNjKh

var topics = ["Dodge Viper" , "Bugatti Veyron" , "Shelby GT500" , "Mclaren P1" , "Ford GT"];

displaybtn();

function displaybtn(){

	$("#tagBtn").empty();
	for ( var i = 0; i < topics.length ; i++){
		var btn = $("<button>");
		btn.addClass("btn btn-secondary gifBtn");
		btn.attr("tag" , topics[i]);
		btn.text(topics[i]);
		$("#tagBtn").append(btn).append(" ");
	}
}

//Populate div with gifs when clicked on the button

function populateGifs(){

	$("#gifCard").empty();
	var category = $(this).attr("tag");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=vyJbstfN67fxuU2HQQeqy79ZcURuNjKh&limit=10";

	$.ajax({
		url : queryURL,
		method: "GET"
	}).then (function(response){

		var gifs = response.data;
		for( var i = 0; i < gifs.length; i++){

			var div = $("<div>");
        		div.attr("id", "gifDiv");
        		var gif = $("<img>");
        		var pause = gifs[i].images.fixed_height_still.url;
        		gif.attr("pauseImg", pause);
        		var play = gifs[i].images.fixed_height.url;
        		gif.attr("playImg", play);        		
        		gif.attr("src", pause);
        		gif.attr("id", "gif");
        		gif.attr("state", "pause");
        		div.append(gif);
       		//rating
           		var rating = gifs[i].rating;
        		var p = $("<p>");
        		p.text("Rating: " + rating);
        		div.append(p);
        		$("#gifCard").append(div);

		}
	})
}

//on-click for playing or pausing gifs

$(document).on("click", "#gif", function() {
	if($(this).attr("state")=="pause"){
		$(this).attr("src", $(this).attr("playImg"));
		$(this).attr("state", "playing");
	}
	else{
		$(this).attr("src", $(this).attr("pauseImg"));
		$(this).attr("state", "pause");
	}

});

//on-click for buttons

$(document).on("click" , ".gifBtn" , populateGifs);

//search bar

$("#submitBtn").on("click" , function(){
	var input = $("#userInput").val().trim();
	topics.push(input);
	displaybtn();

})