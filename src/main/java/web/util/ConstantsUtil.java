package web.util;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Properties;

import org.apache.log4j.Logger;

import com.gwghk.gold.util.ConfigLoader;

public class ConstantsUtil {
	private final static Logger logger = Logger.getLogger(ConstantsUtil.class);
	
	private static Properties properties = null;
	
	public static ArrayList<String> getGoldPriceCommissionList() {
		ArrayList<String> goldPriceCommision = new ArrayList<String>();
		NumberFormat format = new DecimalFormat("#0.00");
		format.setMaximumFractionDigits(2);
		format.setMinimumFractionDigits(2);
		
		for(double i = 0.0; i<=0.51; i = i + 0.01) {				
				goldPriceCommision.add(format.format(i));
		}
		
		return goldPriceCommision;
	}
	
	public static ArrayList<String> getSilverPriceCommision() {
		ArrayList<String> silverPriceCommision = new ArrayList<String>();
//		silverPriceCommision.add("0.00");
//		silverPriceCommision.add("0.01");
//		silverPriceCommision.add("0.02");
//		silverPriceCommision.add("0.03");
//		silverPriceCommision.add("0.04");
		NumberFormat format = new DecimalFormat("#0.0000");
		format.setMaximumFractionDigits(4);
		format.setMinimumFractionDigits(4);
		silverPriceCommision.add(format.format(0.0000));
		silverPriceCommision.add(format.format(0.0010));
		silverPriceCommision.add(format.format(0.0012));
	    silverPriceCommision.add(format.format(0.0014));
		silverPriceCommision.add(format.format(0.0016));
		silverPriceCommision.add(format.format(0.0018));
		silverPriceCommision.add(format.format(0.0020));
	    silverPriceCommision.add(format.format(0.0022));
	    silverPriceCommision.add(format.format(0.0024));
	    silverPriceCommision.add(format.format(0.0026));
	    silverPriceCommision.add(format.format(0.0028));
	    silverPriceCommision.add(format.format(0.0030));
	    silverPriceCommision.add(format.format(0.0032));
	    silverPriceCommision.add(format.format(0.0034));
	    silverPriceCommision.add(format.format(0.0036));
	    silverPriceCommision.add(format.format(0.0038));
	    silverPriceCommision.add(format.format(0.0040));
		return silverPriceCommision;
	}
	
	public static String getProp(String name) {
		if(properties == null){
			properties = ConfigLoader.getInstance().getProperties("/init.properties");	
		}
		return properties.getProperty(name);
	}
	
	public static ArrayList<Integer> getPageOption() {
		ArrayList<Integer> rowPerPageOption = new ArrayList<Integer>(); // <select> <option>
		rowPerPageOption.add(20);
		rowPerPageOption.add(50);
		rowPerPageOption.add(100);
		rowPerPageOption.add(500);
		rowPerPageOption.add(1000);
		return rowPerPageOption;
	}
	
}
