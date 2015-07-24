package web.util;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class IntegerAdapter extends XmlAdapter<String, Integer> {

   public Integer unmarshal(String t)  throws Exception {
	  if(StringUtil.isNullOrEmpty(t)){
		  return 0;
	  }else{
		  return Integer.valueOf(t);
	  }
   }

   public String marshal(Integer d)  throws Exception  {
     return String.valueOf(d);
   }

}
