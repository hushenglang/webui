package web.util;
import java.util.regex.Pattern;

public class Regex {
	/**
	 * 检查email输入是否正确 正确的书写格式为 username@domain
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkEmail(String value, String reg) {
		return value.matches(reg);
	}

	/**
	 * 检查电话输入是否正确 正确格式 012-87654321、0123-87654321、0123－7654321
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkTel(String value) {
		return value.matches("\\d{4}-\\d{8}|\\d{4}-\\d{7}|\\d(3)-\\d(8)");
	}

	/**
	 * 检查手机输入是否正确
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkMobile(String value) {
		return value.matches("^[1][3,5]+\\d{9}");
	}

	/**
	 * 检查中文名输入是否正确
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkChineseName(String value, int length) {
		return value.matches("^[\u4e00-\u9fa5]+$") && value.length() <= length;
	}

	/**
	 * 检查HTML中首尾空行或空格
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkBlank(String value) {
		return value.matches("^\\s*|\\s*$");
	}

	/**
	 * 检查字符串是否含有HTML标签
	 * 
	 * @param value
	 * @return
	 */

	public static boolean checkHtmlTag(String value) {
		return value.matches("<(\\S*?)[^>]*>.*?</\\1>|<.*? />");
	}

	/**
	 * 检查URL是否合法
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkURL(String value) {
		return value.matches("[a-zA-z]+://[^\\s]*");
	}

	/**
	 * 检查IP是否合法
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkIP(String value) {
		return value.matches("\\d{1,3}+\\.\\d{1,3}+\\.\\d{1,3}+\\.\\d{1,3}");
	}

	/**
	 * 检查ID是否合法，开头必须是大小写字母，其他位可以有大小写字符、数字、下划线
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkID(String value) {
		return value.matches("[a-zA-Z][a-zA-Z0-9_]{4,15}$");
	}

	/**
	 * 检查QQ是否合法，必须是数字，且首位不能为0，最长15位
	 * 
	 * @param value
	 * @return
	 */

	public static boolean checkQQ(String value) {
		return value.matches("[1-9][0-9]{4,13}");
	}

	/**
	 * 检查邮编是否合法
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkPostCode(String value) {
		return value.matches("[1-9]\\d{5}(?!\\d)");
	}

	/**
	 * 检查身份证是否合法,15位或18位
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkIDCard(String value) {
		return value.matches("\\d{15}|\\d{18}");
	}

	/**
	 * 检查输入是否超出规定长度
	 * 
	 * @param length
	 * @param value
	 * @return
	 */
	public static boolean checkLength(String value, int length) {
		return ((value == null || "".equals(value.trim())) ? 0 : value.length()) <= length;
	}

	/**
	 * 检查是否为空字符串,空：true,不空:false
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkNull(String value) {
		return value == null || "".equals(value.trim());
	}
	
	/**
	 * 检查是否为一浮点型数字-123123.123
	 * (-?\\d+)(\\.\\d+)?$
	 */
	public static boolean checkNum(String value) {
		return value.matches("(-?\\d+)(\\.\\d+)?$");		 
	}

	
	public static boolean isNumeric(String str){
		if(StringUtil.isNullOrEmpty(str)) return false;
	    Pattern pattern = Pattern.compile("[0-9]*"); 
	    return pattern.matcher(str).matches();    
	}
	
	public static boolean isStockCode(String str){
		if(StringUtil.isNullOrEmpty(str)) return false;
		str = str.trim();
		if(str.length() != 5) return false;
		
		Pattern pattern = Pattern.compile("\\d{5}");
		return pattern.matcher(str).matches();
	 }
	
	public static boolean isFuturesCode(String str){
		if(StringUtil.isNullOrEmpty(str)) return false;
		str = str.trim();
		if(str.length() < 5) return false;
		
		Pattern pattern2 = Pattern.compile("[A-Z]{4}\\d{1}");
		Pattern pattern3 = Pattern.compile("[A-Z]{3}[a-zA-Z0-9]*\\d{1}"); 
		if(str.length() == 5) {
			return pattern2.matcher(str).matches();
		} else {
			return pattern3.matcher(str).matches();
		}
	 }
	
	public static void main(String [] args) {
		System.out.println("result: " + isStockCode("00333"));
	}
}