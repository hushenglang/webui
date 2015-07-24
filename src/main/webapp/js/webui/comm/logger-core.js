/**
 * 浏览器控制台打印日志
 */
var Log = {
	debug : function() {
		if (window.console) {
			if (console.log.apply)
				console.log.apply(console, arguments);
			else if (Function.prototype.call)
				Function.prototype.call.apply(console.log, [ console ].concat(Array.prototype.slice.call(arguments, 0)));
		}
	}
};

var Logs = [];
var LogsPrinter = true; // logger control flag
(function(logs){
	console = ('undefined' === typeof console) ? {} : console;
	var functions = ["log", "info", "debug", "warn", "error", "assert"];
	for(var i = 0; i < functions.length; i++){
		var name = functions[i];
		if(LogsPrinter == false){
			console[name] = function(){}; // do nothing.
		}else if('undefined' === typeof console[name]){
			console[name] = function(){
				if(arguments.length > 0){
					if(logs.length > 100){
						logs.shift();
					}
					logs.push(name + ": " + arguments[0]);
				}
			};	
		}
	}	
})(Logs);