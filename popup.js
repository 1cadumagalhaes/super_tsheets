document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('updateBtn').addEventListener('click', clickHandler);
	
	chrome.storage.sync.get('horas', function(items) {
		console.log("LOADED: " + items['horas']);
		document.getElementById('hoursInput').value = items['horas'];
		clickHandler();
    });
    
    document.getElementById('toggleEdit').addEventListener('click', function(){
    document.getElementById('timeinput').classList.toggle('active');
});

	
});

function clickHandler(e) {
    chrome.tabs.executeScript({
        code: "receiveInput(" + document.getElementById('hoursInput').value + ")",
        allFrames: true
    });
	
	// Save it using the Chrome extension storage API.
    chrome.storage.sync.set({'horas': document.getElementById('hoursInput').value}, function() {
          // Notify that we saved.
		console.log('Settings saved');
    });
}



