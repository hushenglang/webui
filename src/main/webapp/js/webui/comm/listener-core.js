jQuery.extend({

/**
 * create socket
 * @param nodeUrl
 */
createSocket: function(name, nodeUrl){
	var socket;
	// create socket
	// 连接node服务 (Disable Socket.io's default "reconnect")
	if (navigator.userAgent.indexOf("MSIE")!=-1){
	    socket = io.connect(nodeUrl, {transports:['jsonp-polling'],reconnect : true, 'try multiple transports' : false, resource: 'socket.io', 'force new connection': true});
	} 
	else { 
		socket = io.connect(nodeUrl, {reconnect : true, 'try multiple transports' : true, resource: 'socket.io', 'force new connection': true});
	}
	socket.$$name = name;
	return socket;
},

/**
 * Function of listen on a socket
 * @param socket
 */
listenSocket : function(socket){

/**
 * get sequence for emit function.
 */
var sequence = {
	i: 9000000,
	next : function(){
		return this.i++;
	}
};

function Callback(callback){
	var _seq = null;
	var _event = null;
	var _callback = callback;
	
	this.setSeq = function(seq){
		_seq = seq;
		return this;
	};
	
	this.setEvent = function(event){
		_event = event;
		return this;
	};
	
	this.listen = function(){
		Callback.list.push(this);
	};
	
	/**
	 * to check if the seq or event matched
	 */
	this.isMatch = function(para, data, event){
		if( _seq != null 
				&& !('undefinded' === typeof para) && para != null 
				&& !('undefinded' === typeof para.seq) && para.seq != null){
			if( _seq == para.seq){
				return true;
			}	
		}else if(_event != null && _event == event){
			return true;
		}
		return false;
	};
	
	/**
	 * Invoke
	 */
	this.invoke = function(para, data, event){
		// if matched, invoke callback
		if(this.isMatch(para, data, event)){
			try{
				var result = _callback(para, data, event);
				// if result is false, return false in order to keep the callback listen to following event.
				if(result == false){
					return false;
				}
			}catch(e){
				console.log(socket.$$name, e);
			}
			return true;
		}
		return false;
	};

}
// callback collection
Callback.list = [];
// callback trigger
Callback.trigger = function(para, data, event){
	for(var i = 0; i < Callback.list.length; i++){
		var callback = Callback.list[i];
		// if match and call success
		if(callback.invoke(para, data, event)){
			// remove 
			Callback.list.splice(i, 1);
			break;
		}
	}
};

/**
 * event trigger
 */
function Trigger(event){
	var _event = event;
	this.call = function(para, data){
		Callback.trigger(para, data, _event);
	};
}
	

var excludeLogEvents = ['tick', 'secTick', 'HeartBeat'];
function logEvent(eventName){
	for(var i = 0; i < excludeLogEvents.length; i++){
		if(eventName == excludeLogEvents[i]){
			return false;
		}
	}
	return true;
}

/**
 * Defined events will be triggered.
 */
var listeners = {
		
		// add listener
		$add: function(listener){
			// loop event in listener
			for(var event in listener){
				this.$register([event]);
				if('function' === typeof listener[event] && 'function' === typeof this[event] ){
					function Listener(event){
						var _event = event;
						var _origListener = listeners[_event];
						var _newListener = listener[_event];
						this.callback = function(para, data){
								// call original then new listener first
								try{
									if('function' === typeof _origListener) _origListener(para, data);
									if('function' === typeof _newListener) _newListener(para, data);									
								}catch(e){
									//console.log(socket.$$name, e);
								}
							};
					} 
					this[event] = new Listener(event).callback;
				}
			}
		},
		// add before listener
		$before: function(listener){
			// loop event in listener
			for(var event in listener){
				this.$register([event]);
				if('function' === typeof listener[event] && 'function' === typeof this[event] ){
					var listenerFn = listener[event];
					event = "$before" + event; // only different here
					function Listener(event){
						var _event = event;
						// original listener
						var _origListener = listeners[_event];
						// new listener
						var _newListener = listenerFn;
						this.callback = function(para, data){
								// call original then new listener first
								try{
									if('function' === typeof _origListener) _origListener(para, data);
									if('function' === typeof _newListener) _newListener(para, data);									
								}catch(e){
									console.log(socket.$$name, e);
								}
							};
					} 
					this[event] = new Listener(event).callback;
				}
			}
		},
		
		// add after listener
		$after: function(listener){
			// loop event in listener
			for(var event in listener){
				this.$register([event]);
				if('function' === typeof listener[event] && 'function' === typeof this[event] ){
					var listenerFn = listener[event];
					event = "$after" + event; // only different here
					function Listener(event){
						var _event = event;
						// original listener
						var _origListener = listeners[_event];
						// new listener
						var _newListener = listenerFn;
						this.callback = function(para, data){
								// call original then new listener first
								try{
									if('function' === typeof _origListener) _origListener(para, data);
									if('function' === typeof _newListener) _newListener(para, data);									
								}catch(e){
									console.log(socket.$$name, e);
								}
							};
					} 
					this[event] = new Listener(event).callback;
				}
			}
		},

		// emit request
		$listenSeq: function(cmd, para, callback){
			if(para == null){
				para = {};
			}
			if(!('undefined' === typeof callback) && callback != null ){
				var seq = sequence.next();
				para.seq = seq;
				new Callback(callback).setSeq(seq).listen();
			}
			console.log(socket.$$name, ">> " + cmd, para);
			socket.emit('request', cmd, para);
		},
		
		$listenEvent: function(cmd, para, event, callback){
			if(!('undefined' === typeof callback) && callback != null ){
				new Callback(callback).setEvent(event).listen();	
			}
			console.log(socket.$$name, ">> " + cmd, para);
			socket.emit('request', cmd, para);
		},
		
		$register : function(events){
			var evenLength=events.length;
			for(var i = 0; i < evenLength; i++){
				var event = events[i];
				if(!('undefined' === typeof this[event])){
					continue;
				}
				var trigger = new Trigger(event).call;
				this[event] = trigger; 
				var listeners = this;
				
				if(! (event.substring(0,1) == '$') ){
					function Listener(event){
						// set event and listener
						var _event = event;
						this.on = function(){
							socket.on(_event, function(para, data){
								listeners.$trigger(_event, para, data);
							}); 
						};
					}
					new Listener(event).on(); 
					// console.log("listen " + event);
				}
			}
		},
		// trigger event
		$trigger : function(event, para, data){
			// trigger before listener
			var beforeListener = listeners["$before" + event];
			if('function' === typeof beforeListener) {
				if(logEvent(event)){
					console.log(socket.$$name, "trigger listener $before" + event);
				}
				beforeListener(para, data);	
			}
			
			// listener
			if(logEvent(event)){
				console.log(socket.$$name, "trigger listener " + event ,para, data);						
			}
			listeners[event](para, data);
			
			// trigger after listener
			var afterListener = listeners["$after" + event];
			if('function' === typeof afterListener) {
				if(logEvent(event)){
					console.log(socket.$$name, "trigger listener $after" + event);
				}
				afterListener(para, data);	
			}
		}
};

// inject listeners
socket.listeners = listeners;

// listen to all event
var $emit = socket.$emit;
socket.$emit = function(event, para, data) {
	// if not registered event found.
	if(!$emit.apply(socket, arguments)){
		if (logEvent(event)) {
			console.log(socket.$$name, "trigger not registered event " + event, para, data);
		}
		Callback.trigger(para, data, event);
	}
};
}

});