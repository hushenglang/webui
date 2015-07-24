package web.util;

import java.math.BigDecimal;

import org.apache.log4j.Logger;

public class NumberFormatUtil { 
	static Logger logger = Logger.getLogger(NumberFormatUtil.class);
	
	public static BigDecimal toNDecimalPlaces(BigDecimal bd, int n){
		if (bd == null)
			return null;
		if (n < 0)
			return bd; 
		String str = bd.toPlainString();
		int decimalPosition = str.indexOf('.');
		if (decimalPosition>=0){
			return new BigDecimal (str.substring(0, decimalPosition+n+1));
		}
		return bd;
	}
	
	public static void main (String [] arg){
		logger.debug (toNDecimalPlaces(new BigDecimal ("123.4567"), 2));
		logger.debug (toNDecimalPlaces(new BigDecimal ("-123.4567"), 2));
	}
}

