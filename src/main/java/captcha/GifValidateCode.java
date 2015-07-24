package captcha;

import java.awt.*;
import java.io.*;
import java.util.*;
import java.awt.image.*;

import captcha.util.GifEncoder;

/**
 * 随机 GIF动画验证码，干扰度比较高
 * GifValidateCode.java
 * @author James.pu Email: James.pu@gwtsz.com
 * Create Date:2013-9-25
 */
public class GifValidateCode {
    //定义验证码字符。去除了O和I等容易混淆的字母（也可写成）
    String[] s = {"A", "B", "C", "D", "E", "F", "G", "H", "G", "K","M", "N", "P", "Q", "R", "S",
      "T", "U", "V", "W","X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g","h", "i", "j", 
      "k", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3",
      "4", "5", "6", "7", "8", "9"};

    //定义生成的验证码的宽度和高度
    int width = 160;
    int height = 35;

    /**
     * 获得(生成)GIF验证码
     * @param width 图片宽度
     * @param height 图片高度
     * @param codeCount 随机产生字符数
     * @param os
     * @return String 系统自动生成的验证码的内容
     */
    public String getValidateCode(int width,int height,int codeCount,OutputStream os) {
    	try{
	    	this.width=width;
	    	this.height=height;
	    	
	        BufferedImage frame = null;
	        @SuppressWarnings("unused")
			Graphics2D teg = null;
			@SuppressWarnings("unused")
			AlphaComposite ac = AlphaComposite.getInstance(AlphaComposite.SRC_OVER,1);
	        GifEncoder agf = new GifEncoder();
	        agf.start(os);
	        agf.setQuality(180);
	        agf.setDelay(1000);
	        agf.setRepeat(0);
	
	        // 生成个随机字符
	        StringBuffer codeText=new StringBuffer();
	        String rands[] = new String[codeCount];
	        String randChar="";
	        for (int i = 0; i < codeCount; i++) {
	        	randChar=s[this.randomInt(0, s.length)];
	            rands[i] = randChar;
	            codeText.append(randChar);
	        }
	
	        //分别使用6种字体
	        Font[] font = new Font[6];
	        font[0] = new Font("Gungsuh", Font.BOLD, 28);
	        font[1] = new Font("宋体", Font.BOLD, 28);
	        font[2] = new Font("Times New Roman", Font.BOLD, 28);
	        font[3] = new Font("隶书", Font.BOLD, 28);
	        font[4] = new Font("Arial Unicode MS", Font.BOLD, 28);
	        font[5] = new Font("方正舒体", Font.BOLD, 28);
	
	        //生成各种颜色
	        Color bgcolor = new Color(255,255,255);
	        Color linecolor = getRandColor(200, 250);
	        Color fontcolor[] = new Color[codeCount];
	        Random random = new Random();
	        for (int i = 0; i < codeCount; i++) {
	            fontcolor[i] = new Color(20 + random.nextInt(110),20 + random.nextInt(110), 20 + random.nextInt(110));
	        }
	        //生成Gif信息类
	        for(int i=0 ;i<codeCount;i++){
		        frame = this.getImage(bgcolor, linecolor, fontcolor, rands, font, i);
		        agf.addFrame(frame);
		        frame.flush();
	        }
	        agf.finish();
	        
	        
	        return codeText.toString();
    	}
    	finally{
    		if(os!=null){
    			try {
					os.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
    		}
    	}
    }


    /**
     * 获得图片缓冲
     * @param bgcolor  背景颜色
     * @param linecolor 背景线的颜色
     * @param fontcolor  字体颜色
     * @param str
     * @param font 字体
     * @param flag
     * @return BufferedImage
     */
    private BufferedImage getImage(Color bgcolor, Color linecolor,Color[] fontcolor,String[] str, Font[] font,int flag) {
        BufferedImage image = new BufferedImage(width, height,BufferedImage.TYPE_INT_RGB);
        //或得图形上下文
        Graphics2D g2d = image.createGraphics();
        //利用指定颜色填充背景
        g2d.setColor(bgcolor);
        g2d.fillRect(0, 0, width, height);
        //画背景线 3*3  (数字越大格子越密)
        g2d.setColor(linecolor);
        for (int i = 0; i < height / 3; i++)
            g2d.drawLine(0, i * 3, width, i * 3);
        for (int i = 0; i < width / 3; i++)
            g2d.drawLine(i * 3, 0, i * 3, height);
       //产生的随机数内容长度
        int strLen=str.length;
        //字体数组长度
        int fontLen=font.length;
        
        int[] height = new int[strLen];
        
        Random rand = new Random();
        
        for(int i=0; i<strLen; i++){
            height[i] = rand.nextInt(15) + 20;
        }
        AlphaComposite ac3 = null;
        for (int i = 0; i < strLen; i++) {
            g2d.setFont(font[randomInt(0,fontLen)]);
            ac3 = AlphaComposite.getInstance(AlphaComposite.SRC_OVER,getAlpha(flag, i));
            g2d.setComposite(ac3);
            g2d.setColor(fontcolor[i]);
            g2d.drawString(str[i], 25 * i + 8, height[i]);
        }
        
        // 随机产生20个干扰点
//       for (int i = 0; i < 100; i++) {
//	      g2d.setColor(new Color(0x123456));//设置干扰点的随机颜色
//	      int x = rand.nextInt(width);
//	      int y = rand.nextInt(this.height);
//	      
//	      g2d.drawOval(x, y, 1, 1); //可以使用干扰线等其他的方式只是调用不同的方法而已
//      }
     
       // 画5干扰线
       Random rnd = new Random(new Date().getTime());
       for(int i=0;i<5;i++){ 
    	 g2d.setColor(getRandColor(100, 155));  //设置干扰线的随机颜色
         int x1 = rnd.nextInt(width);    //线条两端坐标值  
         int y1 = rnd.nextInt(this.height);  
         int x2 = rnd.nextInt(width);    
         int y2 = rnd.nextInt(this.height);    
         g2d.drawLine(x1, y1, x2, y2); //画线条    
       }  
     
        g2d.dispose();
        return image;
    }

    /**
     * 获得循环透明度，从0到1 步长为0.2
     * @param i
     * @param j
     * @return float
     */
    private float getAlpha(int i, int j) {
        if ((i + j) > 5)
            return ((i + j) * 0.2f - 1.2f);
        else 
            return (i + j) * 0.2f;        
    }

    /**
     * 获得随机颜色
     * @param fc 给定范围获得随机颜色
     * @param bc 给定范围获得随机颜色
     * @return Color
     */
    private Color getRandColor(int fc, int bc) { 
        Random random = new Random();
        if (fc > 255)
            fc = 255;
        if (bc > 255)
            bc = 255;
        int r = fc + random.nextInt(bc - fc);
        int g = fc + random.nextInt(bc - fc);
        int b = fc + random.nextInt(bc - fc);
        return new Color(r, g, b);
    }

    /**
     * 产生随机数
     * 返回[from,to)之间的一个随机整数
     * @param from 起始值
     * @param to 结束值
     * @return  [from,to)之间的一个随机整数
     */
    Random r = new Random();
    private int randomInt(int from, int to) {
        return from + r.nextInt(to - from);
    }
}