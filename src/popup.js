function clickHandler(e) {
    var horas = document.getElementById('hoursInput').value;
    document.getElementById('hoursOutput').value = horas;
    chrome.tabs.executeScript({
        code: "receiveInput(" + horas + ")",
        allFrames: true
    });
	
	// Save it using the Chrome extension storage API.
    chrome.storage.sync.set({'horas': horas}, function() {
          // Notify that we saved.
		console.log('Settings saved');
    });
}



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('updateBtn').addEventListener('click', clickHandler);
    

    document.getElementById('toggleEdit').addEventListener('click', function(){
    document.getElementById('timeinput').classList.toggle('active');

    chrome.storage.sync.get('horas', function(items) {
        console.log("LOADED: " + items['horas']);
        document.getElementById('hoursInput').value = items['horas'];
        document.getElementById('hoursOutput').value = items['horas'];
        clickHandler();
    });
    
});

    
});

