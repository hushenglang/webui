/**
 * 系统时间
 */
var SystemTime = {};
$(function(){
	
	var initSystemTime = 0;
	var initUiTime = 0;
	var time = 0;
	var lastRefresh = 0;
	
	// 系統時間
	socket.listeners.$add({'servertime': function(para, data) {
		var now = new Date().getTime();
		initUiTime = now; 
		initSystemTime = para.time * 1000;
	}});
	
	function refreshTime() {
		refresh();
		refreshSystemTime();
	}
	
	function refresh(){
		var now = new Date().getTime();
		if(lastRefresh > 0 && 
				(lastRefresh > now || lastRefresh + 5000 < now)){
			initUiTime += now - lastRefresh;
		}
		time = (now - initUiTime) + initSystemTime;
		lastRefresh = now;
		$("#sp_service_time").html(Util.getSimpleTime(time, "hh:mm:ss"));
		exportValues();
		// every 1 second
		setTimeout(refresh, 1000);
	}
	
	function exportValues(){
		SystemTime.time = time;
	}
	
	function refreshSystemTime() {
		socket.emit('request', 0x1010f, {"param1":0});		
		setTimeout(refreshSystemTime, 60 * 1000);
	}
	
	refreshTime();
});