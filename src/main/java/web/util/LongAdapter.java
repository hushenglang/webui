package web.util;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class LongAdapter extends XmlAdapter<String, Long> {

   public Long unmarshal(String t)  throws Exception {
	  if(StringUtil.isNullOrEmpty(t)){
		  return 0L;
	  }else{
		  return new Long(t);
	  }
   }

   public String marshal(Long d)  throws Exception  {
     return String.valueOf(d);
   }

}
