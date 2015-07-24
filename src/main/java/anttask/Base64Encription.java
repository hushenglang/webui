package anttask;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * webui的js加密,用的是标准的base64加密方法
 * STXEncription.java
 * @author Joe Hu Email:Joe.Hu@222m.net
 * @version 1.0 Create Time: 上午10:58:40 2014年5月30日
 * Update Time:
 */
public class Base64Encription {

	public  String encode(byte[] bstr) {
		String result = new sun.misc.BASE64Encoder().encode(bstr);
		return replaceBlank(result);
	}

	public  byte[] decode(String str){
		byte[] bt = null;
		try{
			sun.misc.BASE64Decoder decoder = new sun.misc.BASE64Decoder();
			bt = decoder.decodeBuffer( str );
		} catch (IOException e) {
			e.printStackTrace();
		}
		return bt;
	}
	
	public  String getTextFromFile(String path) throws IOException{
		FileInputStream fin = new FileInputStream(path);
		byte[] b=new byte[fin.available()];//新建一个字节数组
		fin.read(b);
		fin.close();
		String re = new String(b);
		return re;
	}
	
	public  void writeToNewFile(String filePath, String text) throws IOException{
		FileOutputStream fout = new FileOutputStream(filePath);
		fout.write(text.getBytes());
		fout.close();
	}
	
	public String replaceBlank(String s)    
	{    
	     Pattern p = Pattern.compile("\\s*|\t|\r|\n");    
	     Matcher m = p.matcher(s);    
	     String after = m.replaceAll("");    
	     return after;
	}
	
	/**
	 * @param args
	 * @throws IOException 
	 */
	public static void main(String[] args) throws IOException {
		Base64Encription baseEncript = new Base64Encription();
		String filepath = args[0];
		String originText = baseEncript.getTextFromFile(filepath);
		String encript = baseEncript.encode(originText.getBytes());
		String wrapdEncript = "var a='"+encript+"';eval(base64decode(a));";
		baseEncript.writeToNewFile(filepath, wrapdEncript);
		System.out.print("encript completed!");
	}

}
