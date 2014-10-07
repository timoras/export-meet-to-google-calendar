javascript:
var s;
if (window.getSelection) {s = window.getSelection();}else{s = document.selection.createRange().text;}
var t = $('h3').text();
if (t) {
    var googleCalUrl;

    var url = $('#view_entry_nav').find('div:nth-child(4)').find('a').attr('href');
    var exportIUrl = url;
    $.ajax({
        url: exportIUrl,
        success: function (data) {
            cal_array = data.split("\n");
            for (var i = 0; i < cal_array.length; i++) {
                ln = cal_array[i];
                if (ln.indexOf('DESCRIPTION') == 0) {
                    var description = ln.substr('DESCRIPTION'.length + 1).trim();
                }
                if (ln.indexOf('DTSTART;TZID=Europe/Vilnius') == 0) {
                    var startDate = ln.substr('DTSTART;TZID=Europe/Vilnius'.length + 1).trim();
                }
                if (ln.indexOf('DTEND;TZID=Europe/Vilnius') == 0) {
                    var endDate = ln.substr('DTEND;TZID=Europe/Vilnius'.length + 1).trim();
                }
                if (ln.indexOf('LOCATION') == 0) {
                    var location = ln.substr('LOCATION'.length + 1).trim();
                }
                if (ln.indexOf('SUMMARY') == 0) {
                    var summary = ln.substr('SUMMARY'.length + 1).trim();
                }
            }

            var dates = startDate + '/' + endDate;
            googleCalUrl = 'http://www.google.com/calendar/event?action=TEMPLATE&pprop=HowCreated%3AQUICKADD' +
                '&text=' + summary +
                '&dates=' + dates +
                '&details=' + description +
                '&location=' + location;
        },
        async: false
        });

    if (googleCalUrl) window.open(encodeURI(googleCalUrl), 'gcal')
} else {
    void(s);
}
