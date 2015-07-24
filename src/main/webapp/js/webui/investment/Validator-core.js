var Validator = {
		
		checkMarketPrice:function(prdcode){
			var tick = Tick.$get(prdcode);
			var interval = Math.abs(SystemTime.time - tick.time);
			if(interval > 60000){
				Alert(WebUIError["26"]);
				return false;
			}else{
				return true;	
			}
		}
		
};