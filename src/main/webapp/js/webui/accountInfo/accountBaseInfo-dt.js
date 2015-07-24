/**
 * ------------ Update view -------------
 */
$(function(){
	// init accountBaseInfo
	var $accountBaseInfo = $('#accountBaseInfo');
	
	// 刷新賬戶資金模塊
	var marginLevelWarning = false;
	
	accountBaseInfo.onUpdate = function(){
		var info = accountBaseInfo;
		$accountBaseInfo.find('#balance').html(Util.fixToStrTwodecimal(info.balance));
		$accountBaseInfo.find('#netValue').html(info.netValue);
		$accountBaseInfo.find('#availDisposableCapital').html(Util.fixToStrTwodecimal(info.availDisposableCapital));
		$accountBaseInfo.find('#availWithdrawCapital').html(info.availWithdrawCapital);
		$accountBaseInfo.find('#floatPl').html(info.floatPl);
		if(info.availDisposableCapital!=0){
			var tmpResult = Util.fixToStrTwodecimal((info.netValue/info.availDisposableCapital)*100);
			$accountBaseInfo.find('#marginLevel').html(tmpResult+"%");
		}else{
			$accountBaseInfo.find('#marginLevel').html("--");
		}
		$accountBaseInfo.find('#cutMargin').html(Util.fixToStrTwodecimal(info.cutMargin * 100));
		
		
		if(tmpResult<=info.warnratio*100){
			$("#li_marginLevel").addClass("bao");
		}else{
			$("#li_marginLevel").removeClass("bao");
		}
	};

	// margin level warning
	$('#marginLevelWarning').hide();
	$('#marginLevelWarningConfirm').click(function(){
		$('#marginLevelWarning').hide();	
	});
	
	//账户信息说明
		$('#accountinfo_ask_tips').click(function(){
			$('#gezIbox20').dialog({
				width:440,
				modal: true
				});
		});
});