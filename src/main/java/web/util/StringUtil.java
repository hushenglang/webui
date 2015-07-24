package web.util;

import java.math.BigDecimal;
import java.text.DecimalFormat;

public class StringUtil {

	public static boolean isNullOrEmpty (String str){
		if (str== null || "".equals(str))
			return true;
		else {
			if(str.trim().equals("")) {
				return true;
			}
			return false;
		}
	}
	
	public static String nullToEmpty(String str){
		if (str== null)
			return "";
			return str;
		
	}
    public static String[] separate(String word,String word2){
    	try{
    		if(word==null){
    			return null;
    		}
    		//System.out.println("word"+word+"word2"+word2);
    		return word.split(word2);
    	}catch(Exception e){
    		e.printStackTrace();
    		return null;
    	}
    }
    public static String removeWordFromList(String word, String removeWord, String word2){
    	try{
    		if(word!=null && removeWord != null){    		
    			String[] wordArray = separate(word,word2);   		
    			String result = "";
    			for(String origin : wordArray){
    				boolean match = false; 
    			
    					if(origin.equals(removeWord)){
    						match = true;	
    					}
    				
    				if(!match){
    					if(result.equals("")){
    						result += origin;
    					}else{
    						result += word2 + origin;
    					}
    				}
    			}
    			return result;
    		}
    		return null;
    	}catch(Exception e){
    		e.printStackTrace();
    		return null;
    	}
    }
    
	public static String formatDecimal(BigDecimal decimal){
		DecimalFormat format  = new DecimalFormat("#,##0.00");
		return format.format(decimal.doubleValue());
	}	
	
	public final static String ILLEGAL_STR = "|,',\",..,‘,(,),+,etc";
	
	public static boolean isRightString(String str) {
		String [] ills = ILLEGAL_STR.split(",");
		
		for(String s : ills) {
			if(str.contains(s)) {
				return false;
			}
		}
		
		return true;
	}
}
