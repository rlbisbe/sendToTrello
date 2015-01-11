
(function() {

	var popupId;
	var apiKey = "";
	var token = "";
	var listId = "";

	function login(){

		chrome.windows.create({url: "https://trello.com/1/authorize?key=" + apiKey + "&name=Send+To+Trello&expiration=1day&response_type=token&scope=read,write", type: 'popup'}, 
		function(createdWindow){
			popupId = createdWindow.id;
		});
	};

	function saveNote(){
		console.log("saving note");

		var noteTitle = $("#newNote input[type=text]").val();
		var description = $("#newNote textarea").val();
		var includeLink = $("#newNote input[type=checkbox]").val();

		console.log(noteTitle);
		console.log(description);
		console.log(includeLink);

		uploadNote(noteTitle, description, includeLink);
	};


	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    if (request.authToken){
	    	token = request.authToken;
	    	chrome.windows.remove(popupId);

	    	chrome.storage.sync.set({"token": request.authToken}, function (value) {
	    		window.location.reload();
	    	});
	    }
	  });


	function uploadNote(noteTitle, description, includeLink){

		var note = {
			idList: listId,
			name: noteTitle,
			desc: description
		};

	    var url = "https://api.trello.com/1/cards?key=" + apiKey + "&token=" + token;

	    $.post(url, note);
	}

	function loadTokenFromStorage(){

		chrome.storage.sync.get("token", function (value) {
			console.log(JSON.stringify(value));
			if (JSON.stringify(value) == '{}') {
				$(".loggedOut").show();
			} else{
				token = value;
				$("#newNote").show();
			}
		});
	}

	$("#login").click(login);
	$("#newNote").submit(saveNote);


	loadTokenFromStorage();
})();



