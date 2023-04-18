(function(){
var originalConsoleLog = console.log;
function consoleLogProxy() {
  originalConsoleLog.apply(console, arguments);
  var htmlConsole = document.getElementById('htmlConsole');
  if (htmlConsole) {
    var message = Array.prototype.slice.apply(arguments, []).join(' ');
    htmlConsole.insertAdjacentHTML("afterbegin",'<li>' + message + '</li>');
  }
}
console.log = consoleLogProxy;
console.log('console.js loaded');
})();