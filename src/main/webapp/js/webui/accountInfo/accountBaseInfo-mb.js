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
		$accountBaseInfo.find('#marginLevel').html(
				(info.marginLevel == '--' || info.warnratio * 100 < info.marginLevel) ? info.marginLevel 
						: '<font color="red">' + info.marginLevel + '</font>' );
		$accountBaseInfo.find('#cutMargin').html(Util.fixToStrTwodecimal(info.cutMargin * 100));
		
		// 儅數據全部載入后
		if(info.comlpatedLoad){
			// 按金水平低於倉位告警水平
			if(info.marginLevel != '--' && info.warnratio * 100 > info.marginLevel){
				// 在低於水平時候顯示
				if(marginLevelWarning == false){
					marginLevelWarning = true;
					var cookieMarginLevel=SystemCookie.getMarginLevel();
					if(Util.isBlank(cookieMarginLevel)){
						$('#marginLevelWarning').show();
						SystemCookie.setMarginLevel(true);
						// 5秒后隱藏
						setTimeout(function(){
							$("#marginLevelWarning").hide();
						}, 5000);	
					}
				}
			}else{
				marginLevelWarning = false;
			}
		}
	};

	// margin level warning
	$('#marginLevelWarning').hide();
	$('#marginLevelWarningConfirm').click(function(){
		$('#marginLevelWarning').hide();	
	});
});