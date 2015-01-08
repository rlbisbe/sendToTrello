(function() {

	var self = this;

	self.login = function(){
		console.log("Loging in");
	};

	self.saveNote = function(){
		console.log("saving note");

		var noteTitle = $("#newNote input[type=text]").val();
		var description = $("#newNote textarea").val();
		var includeLink = $("#newNote input[type=checkbox]").val();

		console.log(noteTitle);
		console.log(description);
		console.log(includeLink);

		uploadNote(noteTitle, description, includeLink);
	};

	$("#login").click(self.login);
	$("#newNote").submit(self.saveNote);

})();

var apiKey = "soon";
var token = "soon"
var listId = "soon"

function uploadNote(noteTitle, description, includeLink){

	var note = {
		idList: listId,
		name: noteTitle,
		desc: description
	};

    var url = "https://api.trello.com/1/cards?key=" + apiKey + "&token=" + token;

    $.post(url, note);
}