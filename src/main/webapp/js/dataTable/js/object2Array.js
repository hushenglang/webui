function Object2Array(mapping){
	
	this.mapping = mapping;
	
	this.toArray = function(obj){
		var result = [];
		if(mapping instanceof Array){
			for(var i = 0; i < mapping.length; i++){
				var name = mapping[i];
				var value = obj[name];
				result.push(value);
			}
		}else{
			for(var name in mapping){
				var f = mapping[name];
				var value = obj[name];
				if('function' === typeof f){
					value = f(value, obj);		
				}
				result.push(value);
			}			
		}
		return result;
	};
	
	this.toArrays = function(objs){
		var result = [];
		for(var i = 0; i < objs.length; i++){
			result.push(this.toArray(objs[i]));
		}
		return result;
	};
	
}