package web.util;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class NullAdapter extends XmlAdapter<String, String> {

   public String unmarshal(String t)  throws Exception {
	   return t;
   }

   public String marshal(String d)  throws Exception  {
	   if(StringUtil.isNullOrEmpty(d)){
		   return "NULL";
	   }else{
		   return d;
	   }
   }

}
