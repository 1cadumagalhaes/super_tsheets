function clickHandler(e) {
    var horas = document.getElementById('hoursInput').value;
    document.getElementById('hoursOutput').value = horas;
    chrome.tabs.executeScript({
        code: "receiveInput(" + horas + ")",
        allFrames: true
    });

    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({ 'horas': horas }, function () {
        // Notify that we saved.
        console.log('Settings saved');
    });
}

function openTab(event, tab) {
    let tabcontent = document.getElementsByClassName("tabcontent")
    let tablinks = document.getElementsByClassName("tablinks")


    for (let content of tabcontent) {
        content.style.display = "none"
    }

    for (let link of tablinks) {
        link.classList.remove("active")
    }
    document.getElementById(tab).style.display = "block"
    event.currentTarget.classList.add("active")
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('updateBtn').addEventListener('click', clickHandler);


    document.getElementById('toggleEdit').addEventListener('click', function () {
        document.getElementById('timeinput').classList.toggle('active');

        chrome.storage.sync.get('horas', function (items) {
            console.log("LOADED: " + items['horas']);
            document.getElementById('hoursInput').value = items['horas'];
            document.getElementById('hoursOutput').value = items['horas'];
            clickHandler();
        });

    });

    let tabs = document.getElementsByClassName("tablinks")
    for (let i = 0; i < tabs.length; i++) {
        let el = tabs[i]
        el.addEventListener('click', function (e) {
            openTab(e, `tab${i + 1}`)
        })
    }


});

