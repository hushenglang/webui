package web.util;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateTime { 

	public DateTime(){}
	
	public static Date getNowDate() { 
		Date currentTime = new Date(); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		String dateString=formatter.format(currentTime); 
		ParsePosition pos = new ParsePosition(8); 
		Date currentTime_2 = formatter.parse(dateString, pos); 
		return currentTime_2; 
	}
	public static Date getNowDateShort() { 
		Date currentTime = new Date(); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); 
		String dateString=formatter.format(currentTime); 
		ParsePosition pos = new ParsePosition(8); 
		Date currentTime_2 = formatter.parse(dateString, pos); 
		return currentTime_2; 
	}
	public static Date getchineseDate() { 
		Date currentTime = new Date(); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日 HH時mm分ss秒"); 
		String dateString=formatter.format(currentTime); 
		ParsePosition pos = new ParsePosition(8); 
		Date currentTime_2 = formatter.parse(dateString, pos); 
		return currentTime_2; 
	}	
	public static String getStringDate(){
		Date currentTime = new Date(); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = formatter.format(currentTime);
		return dateString;
	}
	public static String getStringDateShort(){
		Date currentTime = new Date(); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String dateString = formatter.format(currentTime);
		return dateString;
	}
	public static String getStringDateShortNoCompart(){
		Date currentTime = new Date(); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		String dateString = formatter.format(currentTime);
		return dateString;
	}	
	public static String getStringDateTimeNoCompart(){
		Date currentTime = new Date(); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmm");
		String dateString = formatter.format(currentTime);
		return dateString;
	}	
	public static Date strToDate(String strDate){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		ParsePosition pos=new ParsePosition(0); 
		Date strtodate=formatter.parse(strDate,pos);
		return strtodate;
	}
	public static String dateToStr(java.util.Date dateDate){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = formatter.format(dateDate);
		return dateString;	
	}
	public static String getStringLongDateTime(){
		Date currentTime = new Date(); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		String dateString = formatter.format(currentTime);
		return dateString;
	}	
	public static String getMonth(){
		Date currentTime = new Date(); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM");
		String monthString = formatter.format(currentTime);
		return monthString;
	}
	public static String getNextMonth(){
		Calendar c = Calendar.getInstance();  
		//SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM");
		//String monthString = formatter.format(c.get(Calendar.MONTH)+1);
		c.setTime(new Date()); 
		String monthString = c.get(Calendar.YEAR)+"-"+c.get(Calendar.MONTH);
		return monthString;
	}	
	public static String getLastMonth(){
		Date currentTime = new Date(); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM");
		String monthString = formatter.format(currentTime);
		return monthString;
	}	
	/** * ȡ�õ�ǰ���������ܵ����һ�� */ 
	public static String getLastDayOfWeek() { 
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); 
		Calendar c = new GregorianCalendar(); 
		c.set(Calendar.DAY_OF_WEEK, c.getFirstDayOfWeek() + 6); // Sunday 
		String strdate = sdf.format(c.getTime()); 
		return strdate; 	
	}
	/** * ȡ�õ�ǰ���������ܵĵ�һ�� */ 
	public static String getFirstDayOfWeek() { 
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); 
		Calendar c = new GregorianCalendar(); 
		c.set(Calendar.DAY_OF_WEEK, c.getFirstDayOfWeek()); // Monday 
		String strdate = sdf.format(c.getTime()); 
		return strdate; 	
	}
	public static Date strToBirthday(String strDate){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		ParsePosition pos=new ParsePosition(0); 
		Date strtodate=formatter.parse(strDate,pos);
		return strtodate;
	}
	public static Date getNow(){
		Date currentTime = new Date(); 
		return currentTime;
	}
	public static long getS(String strDate){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		ParsePosition pos=new ParsePosition(0); 
		Date strtodate=formatter.parse(strDate,pos);
		return strtodate.getTime();
	}

	public static Date getLastDate(String strDate,long day) {
		Date date=strToBirthday(strDate);
		long date_3_hm=date.getTime()-3600000*24*day; 
		Date date_3_hm_date=new Date(date_3_hm); 
		return date_3_hm_date;
	}
	
	public static Date getLastDate(long day) {
		Date date=new Date();
		long date_3_hm=date.getTime()-3600000*24*day; 
		Date date_3_hm_date=new Date(date_3_hm); 
		return date_3_hm_date;
	}
	
	public static String getStringLastDate(String strDate,long day) {
		Date date=strToBirthday(strDate);
		long date_3_hm=date.getTime()-3600000*24*day; 
		Date date_3_hm_date=new Date(date_3_hm); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String monthString = formatter.format(date_3_hm_date);
		return monthString;
	}
	
	public static String getStringLastDate(int day) {
		Date date=new Date();
		long date_3_hm=date.getTime()- 3600000L*24*day; 
		Date date_3_hm_date=new Date(date_3_hm); 
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String monthString = formatter.format(date_3_hm_date);
		return monthString;
	}	
	
	public static boolean isBeforeToday(String datetime) throws Exception {
		Date date=new Date();
		SimpleDateFormat formatDay = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String today=formatDay.format(date)+" 00:00:00";
		Date date_today=formatter.parse(today);
		Date date_datetime=formatter.parse(datetime);
		return date_datetime.before(date_today);
	}	
	
}

