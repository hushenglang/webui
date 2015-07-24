var SystemConnection = {
		login: false,
		status: 'disconnect'
};
$(function(){
	
	socket.listeners.$before({
		// 報價
		"secTick": function(para, data){
			SystemConnection.updateConnectStatus('connect');
		},
		// complete login
		'OrderEnd': function(para, data) {
			SystemConnection.login = true;
		}
	});
	
	SystemConnection.updateConnectStatus = function(status){
		SystemConnection.status = status;
		refresh();
	};
	
	function refresh(){
		var status = SystemConnection.status;
		Global.connectStatus = status;
		if(status == 'connect'){
			$('#sp_conn_status').html(i18n.connStatusFine);
			$('#sp_conn_status').parent().removeClass('frtimt-red');
			$('#sp_conn_status').prev().addClass('dn');
		}else if(status == 'disconnect'){
			$('#sp_conn_status').html(i18n.connStatusFail);
			$('#sp_conn_status').parent().addClass('frtimt-red');
			$('#sp_conn_status').prev().removeClass('dn');
		}
	}
});
