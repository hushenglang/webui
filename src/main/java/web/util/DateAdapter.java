package web.util;

import java.util.Date;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class DateAdapter extends XmlAdapter<String, Date> {

   public Date unmarshal(String t)  throws Exception {
	   if(StringUtil.isNullOrEmpty(t)){
		   return null;
	   }
     return DateUtil.stringToDate(t);
   }

   public String marshal(Date d)  throws Exception  {
	   if(d == null){
		   return null;
	   }
     return DateUtil.dateToStringAMPM(d);
   }

}
