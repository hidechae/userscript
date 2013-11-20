// ==UserScript==
// @name       jenkins console style
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description change jenkins console style like travis ci
// @match      http://jenkins.dev.gree.jp/*/console*
// @copyright  2013+
// ==/UserScript==

var lineColor = 'white';
var lineNumberColor = '#999';
var backgroundColor = '#222';
var hiliteColor = '#444';

var url = document.URL;
if (url.match(/.*consoleText$/)) {
    var body = document.getElementsByTagName('body')[0];
    body.style.margin = '0px';
}

var preTagList = document.getElementsByTagName('pre');
for (var i = 0; i < preTagList.length; i++) {
    var preTag = preTagList[i];
    preTag.style.background = backgroundColor;
    preTag.style.color = lineColor;

    var textPerLine = preTag.innerHTML.split('\n');
    var consoleLog = '<table style="padding-top: 10px; padding-bottom: 10px;">';
    var result = '';
    for (var j = 0; j < textPerLine.length; j++) {
        var line = textPerLine[j];
        var lineNumber = j + 1;
        var id = 'L' + lineNumber;
        consoleLog +=
            '<tr id="' + id + '">' +
              '<td style="padding-left: 10px;">' +
                '<a href="#' + id + '" style="color: ' + lineNumberColor + '; text-decoration: none;">' + lineNumber + '</a>' +
              '</td>' +
              '<td style="color: ' + lineColor + '; padding-left: 10px;">' + line + '</td>' +
            '</tr>';

        // get result
        if (result == '' && line.match(/Tests: \d+(, Assertions: \d+)?(, Failures: \d+)?(, Errors: \d+)?(, Incomplete: \d+)?(, Skipped: \d+)?./)) {
            result = 'result: ' + line;
        }
        if (line.match(/There.*error(s)?:/)) {
            var errorLineId = id;
        }
    }
    consoleLog += '</table>';
    resultContent =
        '<div style="padding: 10px;">' + result + '</div>';
    preTag.innerHTML = resultContent + consoleLog;
}

document.addEventListener('mouseover', function(e) {
    var parent = e.target.parentElement || e.target.parentNode;
    var id = parent.id;
    if (typeof(id) != 'undefined' && id.match(/L\d+/)) {
    var elem = document.getElementById(id);
    elem.style.background = hiliteColor;
    }
});

document.addEventListener('mouseout', function(e) {
    var parent = e.target.parentElement || e.target.parentNode;
    var id = parent.id;
    if (typeof(id) != 'undefined' && id.match(/L\d+/)) {
    var elem = document.getElementById(id);
    elem.style.background = backgroundColor;
    }
});
