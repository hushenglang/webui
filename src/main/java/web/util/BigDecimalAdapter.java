package web.util;

import java.math.BigDecimal;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class BigDecimalAdapter extends XmlAdapter<String, BigDecimal> {

   public BigDecimal unmarshal(String t)  throws Exception {
		  if(StringUtil.isNullOrEmpty(t)){
			  return BigDecimal.ZERO;
		  }else{
			  t=t.replaceAll(",", "");
			  return new BigDecimal(t);
		  }
   }

   public String marshal(BigDecimal d)  throws Exception  {
     return String.valueOf(d);
   }

}
