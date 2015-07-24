package web.util;

import java.util.Date;

public class GoodDateFormat {

	private final String format;

	public GoodDateFormat(String format) {

		this.format = format;
		if (!format.equals("yyyy-MM-dd") &&
				!format.equals("yy-MM-dd") &&
				!format.equals("yyMMdd") &&
				!format.equals("yyyy-MM-dd HH:mm:ss")&&
				!format.equals("yyyy-MM-dd HH:mm:ss.SSS")){
			throw new IllegalArgumentException("Wrong format String");
		}
	}

	public final Date parse(String strDate) {
		if (format.equals("yyyy-MM-dd"))
			return DateUtil.getYyyyMmDd(strDate);
		if (format.equals("yy-MM-dd"))  //very likely wrong 2009-07-24 David
			return DateUtil.getYyyyMmDd(strDate);
		if (format.equals("yyMMdd"))
			return DateUtil.getYyyyMmDd(strDate);
		if (format.equals("yyyy-MM-dd HH:mm:ss"))
			return DateUtil.getYyyyMmDdHhMmss(strDate);
		return null;
	}
	public final String format (Date aDate){
		if (format.equals("yyyy-MM-dd HH:mm:ss")) // 2009-07-24 david
			return DateUtil.toYyyymmddHhmmss(aDate);
//		if (format.equals("yyyy-MM-dd HH:mm:ss.SSS")) // 2009-07-24 david
//			return DateUtil.toYyyymmddHhmmssSSS(aDate);
		return "";
		
	}
}
