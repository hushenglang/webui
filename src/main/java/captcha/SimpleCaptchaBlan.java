package captcha;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

import javax.imageio.ImageIO;

import static captcha.util.Randoms.alpha;

/**
 * 简单验证码(静态图片)
 * SimpleCaptchaBlan.java
 * @author James.pu Email: James.pu@gwtsz.com
 * Create Date:2013-10-17
 */
public class SimpleCaptchaBlan {
	//随机函数
	Random random = new Random();
	// 字体
	protected Font font = new Font("Times New Roman", Font.ITALIC|Font.BOLD, 19);   
	/**
	 * 生成验证码及内容
	 * @param width 验证码图片宽度
	 * @param height 验证码图片高度
	 * @param len 验证码字符个数
	 * @param out 输出流
	 * @return 返回验证码内容
	 */
	public String captcha(int width,int height,int len,OutputStream out){
		return graphicsImage(width,height,len,out);
	}

	private String graphicsImage(int width,int height,int len,OutputStream out){
		String sRand="";
		try {
				
				BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
				image.setRGB(0, 0, 0);
				Graphics g = image.getGraphics();
				g.setColor(getRandColor(180,250));
				g.fillRect(0, 0, width, height);
				g.setFont(font);
				g.setColor(new Color(random.nextInt(130),random.nextInt(180),random.nextInt(200)));
				g.drawRect(0,0,width-1,height-1);
				
				//根据产生的字符画图片内容
				 int h  = height - ((height - font.getSize()) >>1),
			         w = width/len,
			         size = w-font.getSize()+1;
				 
				for (int i=0;i<len;i++){
			    	String rand=String.valueOf(alpha());
			    	sRand+=rand;
			    	g.setColor(new Color(50+random.nextInt(110),50+random.nextInt(110),50+random.nextInt(110)));//调用函数出来的颜色相同，可能是因为种子太接近，所以只能直接生成
			    	g.drawString(rand,(width-(len-i)*w)+size, h-4);
				}
				g.dispose();
		        //生成图片
				ImageIO.write(image, "JPEG", out);
				
		} catch (IOException e) {
			e.printStackTrace();
		}
		finally{
			try {
				if(out!=null)
					out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return sRand;
	}
	/**
	 * 随机背景颜色
	 * @param s
	 * @param e
	 * @return
	 */
	private Color getRandColor(int s, int e) {

		if (s > 255)

			s = 255;

		if (e > 255)

			e = 255;

		int r = s + random.nextInt(e - s);

		int g = s + random.nextInt(e - s);

		int b = s + random.nextInt(e - s);

		return new Color(r, g, b);

	}
}
