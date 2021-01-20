

console.log("Super TSheets Loaded");

var TOTAL_DIA = 8, FERIADOS = 0;

chrome.storage.sync.get('horas', function (items) {
    console.log("LOADED: " + items['horas']);

    if (!items['horas']) {
        chrome.storage.sync.set({ 'horas': TOTAL_DIA });
    }
    else {
        TOTAL_DIA = Number(items['horas']);
    }
});

function receiveInput(horas) {
    TOTAL_DIA = horas;
}


function calculoSemanal(TOTAL_DIA) {
    var semanaFeito = new Date(); //Quantas horas já fez na semana
    var horas = document.getElementById("timecard_week_total").innerText;
    semanaFeito.setHours.apply(semanaFeito, /\d{1,2}:\d{2}/.test(horas) ? horas.split(":").concat([0]) : [0, 0, 0]);
    var semanaCompleta = new Date();
    semanaCompleta.setHours(
        semanaCompleta.getHours() + (semanaCompleta.getDay() * TOTAL_DIA) - semanaFeito.getHours(),
        semanaCompleta.getMinutes() + 0 - semanaFeito.getMinutes()
    );
    var horaSemana = semanaCompleta.getHours() + ":" + String("0" + semanaCompleta.getMinutes()).slice(-2);
    return horaSemana;
}


function calculoDiario(TOTAL_DIA) {
    var diaFeito = new Date(); //Quantas horas já fez na semana
    var horas = document.getElementById("timecard_day_total").innerText
    diaFeito.setHours.apply(diaFeito, /\d{1,2}:\d{2}/.test(horas) ? horas.split(":").concat([0]) : [0, 0, 0]);
    var diaCompleto = new Date();
    diaCompleto.setHours(
        diaCompleto.getHours() + TOTAL_DIA - diaFeito.getHours(),
        diaCompleto.getMinutes() + 0 - diaFeito.getMinutes()
    );
    var horaDia = diaCompleto.getHours() + ":" + String("0" + diaCompleto.getMinutes()).slice(-2);
    return horaDia;
}

function executaCalculos(TOTAL_DIA) {
    if (document.getElementById("completion_div") == null) {
        clearInterval(update);
        return;
    }

    var dia = document.querySelector('#completion_time_day > span');
    var semana = document.querySelector('#completion_time_week > span');

    var hora_dia = calculoDiario(TOTAL_DIA), hora_semana = calculoSemanal(TOTAL_DIA);
    dia.innerHTML = hora_dia, semana.innerHTML = hora_semana;
}

function insertCompletionTimes() {
    var el = document.querySelector('dl.totals');
    if (el != null) {
        var mydiv = document.createElement('div');
        mydiv.setAttribute('id', 'completion_div')
        var estrutura = '<dl id="finals" style="column-count:2;" class="totals">'
            + '<dt aria-hidden="true">COMPLETION TIME (DAY)</dt>'
            + '<dd id="completion_time_day"> '
            + '<span aria-hidden="true"> 00:00</span>'
            + '</dd>'
            + '<dt aria-hidden="true">COMPLETION TIME (WEEK)</dt>'
            + '<dd id="completion_time_week"> '
            + '<span aria-hidden="true"> 00:00</span>'
            + '</dd>'
            + '</dl>';
        mydiv.innerHTML = estrutura;
        el.parentNode.insertBefore(mydiv, el.nextElementSibling);

        var update = setInterval(executaCalculos(TOTAL_DIA), 100);
    }
}


var mySearch = setInterval(function () {
    var el = document.querySelector("#timecard_box");
    var el2 = document.querySelector("#completion_div");
    if (el != null && el2 == null) {
        insertCompletionTimes();
    }
}, 100);



