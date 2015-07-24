package web.util;

import java.util.Random;

public class GetRandomPwd {
	public static String getRandomPwd() {
		Random ran = new Random();
		StringBuffer pwd = new StringBuffer("");
		for(int i = 0; i < 8; i++) {
			pwd.append(ran.nextInt(9));
		}
		return pwd.toString();
		
	}
    public static String getRandStr(int num) {
        String rndStr;
        String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        String str2="012345678";
       StringBuffer saveStr = new StringBuffer();
 
       for (int i=1; i<=num; i++) {
       	if((i%2)==0){
               int numAt = (int)(Math.random()*(str.length()-1));
               saveStr.append(str.charAt(numAt));
       	}else{
               int numAt = (int)(Math.random()*(str2.length()-1));
               saveStr.append(str2.charAt(numAt));
       	}
       }
 
       rndStr = saveStr.toString();
 
       return rndStr;
    }
	public  static void main(String [] args) {
		System.out.println(getRandomPwd());
	}
}
