package web.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.log4j.Logger;

public class DateUtil {
	private final static Logger logger = Logger.getLogger(DateUtil.class);
	static SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private final static String[] months = { "Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec", };
	
	public static synchronized  Date stringToDate(String time){ 
	    SimpleDateFormat formatter; 
	    int tempPos=time.indexOf("AD") ; 
	    time=time.trim() ; 
	    formatter = new SimpleDateFormat ("yyyy.MM.dd G 'at' hh:mm:ss z"); 
	    if(tempPos>-1){ 
	      time=time.substring(0,tempPos)+ 
	           "公元"+time.substring(tempPos+"AD".length());//china 
	      formatter = new SimpleDateFormat ("yyyy.MM.dd G 'at' hh:mm:ss z"); 
	    } 
	    tempPos=time.indexOf("-"); 
	    if(tempPos>-1&&(time.indexOf(" ")<0)){ 
	      formatter = new SimpleDateFormat ("yyyyMMddHHmmssZ"); 
	    } 
	    else if((time.indexOf("/")>-1) &&(time.indexOf(" ")>-1)){ 
	      formatter = new SimpleDateFormat ("MM/dd/yyyy HH:mm:ss"); 
	    } 
	    else if((time.indexOf("-")>-1) &&(time.indexOf(" ")>-1)){ 
	      formatter = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss"); 
	    } 
	    else if((time.indexOf("/")>-1) &&(time.indexOf("am")>-1) ||(time.indexOf("pm")>-1)){
	       formatter = new SimpleDateFormat ("dd/MM/yyyy KK:mm:ss a"); 
	    } 
	    else if((time.indexOf("-")>-1) &&(time.indexOf("am")>-1) ||(time.indexOf("pm")>-1)){
	       formatter = new SimpleDateFormat ("yyyy-MM-dd KK:mm:ss a"); 
	    }else{
	    	 formatter = new SimpleDateFormat ("dd/MM/yyyy"); 
	    }
	    ParsePosition pos = new ParsePosition(0); 
	    java.util.Date ctime = formatter.parse(time, pos); 

	    return ctime;  
	} 

	public static synchronized String dateToStringAMPM(Date time){ 
	    SimpleDateFormat formatter; 
	    formatter = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss"); 
	    String ctime = formatter.format(time); 
	    return ctime; 
	} 
	public final static Date parseComplicateDate(String str) {
		try{
			//			System.out.println("str: " + str);
			logger.warn(str);
			if (StringUtil.isNullOrEmpty(str))
				return null;
			String[] strs = str.split(" ");
			int nYear = Integer.parseInt(strs[5]);
			int nMonth = 0;
			for (int i = 0; i < months.length; i++) {
				if (months[i].equals(strs[1])) {
					nMonth = i;
					break;
				}
			}
			int nDay = Integer.parseInt(strs[2]);
			String strTime = strs[3];
			String[] strTimes = strTime.split(":");
			int nHour = Integer.parseInt(strTimes[0]);
			int nMinute = Integer.parseInt(strTimes[1]);
			int nSecond = Integer.parseInt(strTimes[2]);
			Calendar cal = new GregorianCalendar(nYear, nMonth, nDay, nHour,
					nMinute, nSecond);
			Date aDate = cal.getTime();
			return aDate;
		}
		catch (ArrayIndexOutOfBoundsException e){
			logger.warn("", e);
			return new Date();
		}
		catch (NumberFormatException e){
			logger.warn("", e);
			return new Date();
		}
		catch (Exception e){
			logger.warn("", e);
			return new Date();
		}
	}

	public static void main(String [] args) {
		Date tmp = new java.util.Date();
		String str = DateUtil.getNowString();
		logger.debug(str);
		logger.debug(tmp);
	}
	public final static Date getDateFromString(String s) {
		return getYyyyMmDd(s);
	}

	public final static Date getDateFromStringNew(String s) {
		return getDdMmYyyy(s);
	}

	public final static Timestamp getFullTimestampFromString(String s) {
		return new Timestamp(parseComplicateDate(s).getTime());
	}

	public final static Date getFullDateFromString(String s) {
		return getYyyyMmDdHhMmss(s);
	}
	public final static Date getFullDateFromStringNew(String s) {
		return getDdMmYyyyHhMmss(s);
	}
	public static void main1 (String [] arg){
		System.out.println (new Date());
		System.out.println (parseComplicateDate(""+new Date()));
	}
	public final static Date getDdMmYyyyHhMmss(String str) {
		if (StringUtil.isNullOrEmpty(str))
			return null;
		try{
			String[] strDays = str.split("-");
			int nYear = Integer.parseInt(strDays[0]);
			int nMonth = Integer.parseInt(strDays[1]);
			String[] strOnlyDay =strDays[2].split("T");
			int nDay = Integer.parseInt(strOnlyDay[0]);

			String[] strTimes = strOnlyDay[1].split(":");
			int nHour = Integer.parseInt(strTimes[0]);
			int nMinute = Integer.parseInt(strTimes[1]);
			int nSecond = Integer.parseInt(strTimes[2]);
			Calendar cal = new GregorianCalendar(nYear, nMonth-1, nDay, nHour,
					nMinute, nSecond);
			return cal.getTime();
		}
		catch (ArrayIndexOutOfBoundsException e){
			logger.warn("", e);
			return null;
		}
		catch (NumberFormatException e){
			logger.warn("", e);
			return null;
		}
		catch (Exception e){
			logger.warn("", e);
			return null;

		}
	}

	public final static Date getDdMmYyyy(String str) {
		if (StringUtil.isNullOrEmpty(str))
			return null;
		try{
			String[] strDays = str.split("-");
			int nYear = Integer.parseInt(strDays[0]);
			int nMonth = Integer.parseInt(strDays[1]);
			String[] strOnlyDay =strDays[2].split("T");
			int nDay = Integer.parseInt(strOnlyDay[0]);
			Calendar cal = new GregorianCalendar(nYear, nMonth-1, nDay, 0,
					0, 0);
			return cal.getTime();
		}
		catch (ArrayIndexOutOfBoundsException e){
			logger.warn("", e);
			return null;
		}
		catch (NumberFormatException e){
			logger.warn("", e);
			return null;
		}
		catch (Exception e){
			logger.warn("", e);
			return null;
		}
	}
	public final static String toYyMmdd(Date aDate){
		if (aDate == null)
			return "";
		Calendar cal = new GregorianCalendar();
		cal.setTime(aDate);
		StringBuilder sb = new StringBuilder();
		int nYear = cal.get(Calendar.YEAR);
		nYear = nYear % 100;
		int nMonth = cal.get(Calendar.MONTH);
		nMonth++;
		int nDay = cal.get(Calendar.DAY_OF_MONTH);
		if (nYear < 10)
			sb.append('0');
		sb.append(nYear);
		if (nMonth < 10)
			sb.append('0');
		sb.append(nMonth);
		if (nDay < 10)
			sb.append('0');
		sb.append(nDay);
		return sb.toString();
	}
	public final static String toYyyyMmdd(Date aDate){
		if (aDate == null)
			return "";
		Calendar cal = new GregorianCalendar();
		cal.setTime(aDate);
		StringBuilder sb = new StringBuilder();
		int nYear = cal.get(Calendar.YEAR);
		int nMonth = cal.get(Calendar.MONTH);
		nMonth++;
		int nDay = cal.get(Calendar.DAY_OF_MONTH);

		sb.append(nYear);
		if (nMonth < 10)
			sb.append('0');
		sb.append(nMonth);
		if (nDay < 10)
			sb.append('0');
		sb.append(nDay);
		return sb.toString();
	}
	public final static String toHyphenatedYyyyMmdd(Date aDate){
		if (aDate == null)
			return "";
		Calendar cal = new GregorianCalendar();
		cal.setTime(aDate);
		int nYear = cal.get(Calendar.YEAR);
		int nMonth = cal.get(Calendar.MONTH);
		nMonth++;
		int nDay = cal.get(Calendar.DAY_OF_MONTH);

		StringBuilder sb = new StringBuilder();
		sb.append(nYear);
		sb.append('-');
		if (nMonth < 10)
			sb.append('0');
		sb.append(nMonth);
		sb.append('-');
		if (nDay < 10)
			sb.append('0');
		sb.append(nDay);
		return sb.toString();
	}

	public final static String toYyyyMmddHHmm(Date aDate){
		if (aDate== null)
			return "";
		Calendar cal = new GregorianCalendar();
		cal.setTime(aDate);

		int nYear = cal.get(Calendar.YEAR);
		int nMonth = cal.get(Calendar.MONTH);
		nMonth++;
		int nDay = cal.get(Calendar.DAY_OF_MONTH);
		int nHour = cal.get(Calendar.HOUR_OF_DAY);
		int nMinute = cal.get(Calendar.MINUTE);

		StringBuilder sb = new StringBuilder();
		sb.append(nYear);
		sb.append("-");

		if (nMonth < 10)
			sb.append('0');
		sb.append(nMonth);
		sb.append("-");

		if (nDay < 10)
			sb.append('0');
		sb.append(nDay);
		sb.append(" ");

		if (nHour < 10)
			sb.append('0');
		sb.append(nHour);
		sb.append(":");

		if (nMinute < 10)
			sb.append('0');
		sb.append(nMinute);
		return sb.toString();
	}

	public final static String toYyyymmddHhmmss(Date aDate){
		if (aDate == null)
			return "";
		Calendar cal = new GregorianCalendar();
		cal.setTime(aDate);
		int nYear = cal.get(Calendar.YEAR);
		int nMonth = cal.get(Calendar.MONTH);
		nMonth++;
		int nDay = cal.get(Calendar.DAY_OF_MONTH);
		int nHour = cal.get(Calendar.HOUR_OF_DAY);
		int nMInute = cal.get(Calendar.MINUTE);
		int nSeconf= cal.get(Calendar.SECOND);

		StringBuilder sb = new StringBuilder();
		sb.append(nYear);
		sb.append('-');
		if (nMonth < 10)
			sb.append('0');
		sb.append(nMonth);
		sb.append('-');
		if (nDay < 10)
			sb.append('0');
		sb.append(nDay);

		sb.append(' ');

		if (nHour < 10)
			sb.append('0');
		sb.append(nHour);
		sb.append(':');
		if (nMInute < 10)
			sb.append('0');
		sb.append(nMInute);
		sb.append(':');
		if (nSeconf < 10)
			sb.append('0');
		sb.append(nSeconf);

		return sb.toString();
	}

	public static Timestamp now(){
		Calendar currDate = Calendar.getInstance();
		return new Timestamp((currDate.getTime()).getTime());
	}

	public synchronized static String getNowString(){
		return sdf.format(new Date());
	}



	@SuppressWarnings("deprecation")
	public static Date getRetreiveStartDate(){
		Date date=new Date(109,8,25,0,0,0);
		return date;
	}

	public static Date addHours(Date date,int hours){
		Calendar calenda=Calendar.getInstance();
		calenda.setTime(date);
		calenda.add(Calendar.HOUR_OF_DAY, hours);
		return calenda.getTime();
	}

	public static Date getOneWeekAgo(){
		Calendar calenda=Calendar.getInstance();
		calenda.add(Calendar.DAY_OF_YEAR, -7);
		return calenda.getTime();
	}


	public static Date getFirstDayOfThisMonth() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(calendar.get(GregorianCalendar.YEAR), calendar.get(GregorianCalendar.MONTH), calendar.get(GregorianCalendar.DATE), 0, 0, 0);
		return calendar.getTime();
	}

	public static Date getFirstDayOfNextMonth() {
		Calendar calendar = new GregorianCalendar();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.add(GregorianCalendar.MONTH, 1);
		calendar.set(calendar.get(GregorianCalendar.YEAR), calendar.get(GregorianCalendar.MONTH), calendar.get(GregorianCalendar.DATE), 0, 0, 0);
		return calendar.getTime();
	}

	public static Date getYesterday() {
		Calendar calendar = GregorianCalendar.getInstance();
		calendar.add(Calendar.DATE, -1);
		calendar.set(calendar.get(GregorianCalendar.YEAR), calendar.get(GregorianCalendar.MONTH), calendar.get(GregorianCalendar.DATE), 0, 0, 0);
		return calendar.getTime();
	}

	public static Date getLastSecondOfToday() {
		Calendar calendar = new GregorianCalendar();
		calendar.set(calendar.get(GregorianCalendar.YEAR), calendar.get(GregorianCalendar.MONTH), calendar.get(GregorianCalendar.DATE), 23, 59, 59);
		return calendar.getTime();
	}

	public static Date getMidDayOfThisMonthExptSunday() {
		Date today = new Date();
		String testTime = "2009-12-14 15:20:00";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date result = null;
		try {
			result = sdf.parse(testTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(result!=null){
				if(today.before(result)) {
					logger.debug("today before midday, begin with 1st of month.");
				}
		}
		Calendar calendar = Calendar.getInstance();
		calendar.set(calendar.get(GregorianCalendar.YEAR), calendar.get(GregorianCalendar.MONTH), 15, 0, 0, 0);
		int days = calendar.get(Calendar.DAY_OF_WEEK);
		if(days == 1) {
			calendar.add(Calendar.DATE, 1);
		}
		Date midMonth = calendar.getTime();
		Date clearingBeginDate = getFirstDayOfThisMonth();
		if(today.after(midMonth)) {
			clearingBeginDate = midMonth;
		}

		System.out.println("real result: " + clearingBeginDate);
		return result;
	}

	public static Date getMaxDate() {
		Calendar calendar = new GregorianCalendar();
		calendar.set(2999, 1, 1, 0, 0, 0);
		return calendar.getTime();
	}
	public final static Date getYyyyMmDd(String str) {
		if (StringUtil.isNullOrEmpty(str))
			return null;
		try{
			//			String[] strs = str.split(" ");
			String[] strDays = str.split("-");
			int nYear = Integer.parseInt(strDays[0]);
			int nMonth = Integer.parseInt(strDays[1]);
			int nDay = Integer.parseInt(strDays[2]);

			Calendar cal = new GregorianCalendar(nYear, nMonth-1, nDay, 0,
					0, 0);
			return cal.getTime();
		}
		catch (ArrayIndexOutOfBoundsException e){
			return null;
		}
		catch (NumberFormatException e){
			return null;
		}
		catch (Exception e){
			return null;
		}
	}
	public final static Date getYyyyMmDdHhMmss(String str) {
		if (StringUtil.isNullOrEmpty(str))
			return null;
		try{
			String[] strs = str.split(" ");
			String[] strDays = strs[0].split("-");
			int nYear = Integer.parseInt(strDays[0]);
			int nMonth = Integer.parseInt(strDays[1]);
			int nDay = Integer.parseInt(strDays[2]);

			String[] strTimes = strs[1].split(":");
			int nHour = Integer.parseInt(strTimes[0]);
			int nMinute = Integer.parseInt(strTimes[1]);
			int nSecond = Integer.parseInt(strTimes[2]);
			Calendar cal = new GregorianCalendar(nYear, nMonth-1, nDay, nHour,
					nMinute, nSecond);
			return cal.getTime();
		}
		catch (ArrayIndexOutOfBoundsException e){
			return null;
		}
		catch (NumberFormatException e){
			return null;
		}
		catch (Exception e){
			return null;

		}
	}
	public static synchronized String getDateW3CFormat( java.util.Date date )
	{
		String pattern = "yyyy-MM-dd HH:mm:ss";
		return getDateFormat( date, pattern );
	}
	public static synchronized String getDateYYYYMMDD( java.util.Date date )
	{
		String pattern = "yyyy-MM-dd";
		return getDateFormat( date, pattern );
	}
	public static synchronized String getDateFormat( java.util.Calendar cal, String pattern )
	{
		return getDateFormat( cal.getTime(), pattern );
	}
	public static synchronized String getDateFormat( java.util.Date date, String pattern )
	{
		synchronized ( sdf )
		{
			String str = null;
			sdf.applyPattern( pattern );
			str = sdf.format( date );
			return str;
		}
	}

	public final static String toYyyymmdd(Date aDate){
		if (aDate == null)
			return "";
		Calendar cal = new GregorianCalendar();
		cal.setTime(aDate);
		int nYear = cal.get(Calendar.YEAR);
		int nMonth = cal.get(Calendar.MONTH);
		nMonth++;
		int nDay = cal.get(Calendar.DAY_OF_MONTH);

		StringBuilder sb = new StringBuilder();
		sb.append(nYear);
		if (nMonth < 10)
			sb.append('0');
		sb.append(nMonth);
		if (nDay < 10)
			sb.append('0');
		sb.append(nDay);
		return sb.toString();
	}
	
	public final static String toHHmmss(Date aDate){
		if (aDate == null)
			return "";
		Calendar cal = new GregorianCalendar();
		cal.setTime(aDate);
		int nHour = cal.get(Calendar.HOUR_OF_DAY);
		int nMInute = cal.get(Calendar.MINUTE);
		int nSeconf= cal.get(Calendar.SECOND);

		StringBuilder sb = new StringBuilder();
		if (nHour < 10)
			sb.append('0');
		sb.append(nHour);
		if (nMInute < 10)
			sb.append('0');
		sb.append(nMInute);
		if (nSeconf < 10)
			sb.append('0');
		sb.append(nSeconf);
		return sb.toString();
	}
	
	
	/**
	 * @param strDate
	 * @param pattern
	 * @return java.util.Calendar
	 */
	public static synchronized Calendar parseCalendarFormat(String strDate,
			String pattern) {
		synchronized (sdf) {
			Calendar cal = null;
			sdf.applyPattern(pattern);
			try {
				sdf.parse(strDate);
				cal = sdf.getCalendar();
			} catch (Exception e) {
				logger.error("", e);
			}
			return cal;
		}
	}
	
	/**
	 * @param strDate
	 * @param pattern
	 * @return java.util.Date
	 */
	public static synchronized Date parseDateFormat(String strDate,
			String pattern) {
		synchronized (sdf) {
			Date date = null;
			sdf.applyPattern(pattern);
			try {
				date = sdf.parse(strDate);
			} catch (Exception e) {
				logger.error("", e);
			}
			return date;
		}
	}
	
	/**
	 * @param strDate
	 * @return java.util.Calendar
	 */
	public static synchronized Calendar parseCalendarSecondFormat(String strDate) {
		String pattern = "yyyy-MM-dd HH:mm:ss";
		return parseCalendarFormat(strDate, pattern);
	}

	/**
	 * @param strDate
	 * @return java.util.Date
	 */
	public static synchronized Date parseDateSecondFormat(String strDate) {
		String pattern = "yyyy-MM-dd HH:mm:ss";
		return parseDateFormat(strDate, pattern);
	}
}
