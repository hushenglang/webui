package captcha;

import java.awt.Color;
import java.awt.Font;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;

import javax.imageio.ImageIO;

import captcha.util.Randoms;
import nl.captcha.Captcha;
import nl.captcha.backgrounds.GradiatedBackgroundProducer;
import nl.captcha.noise.CurvedLineNoiseProducer;
import nl.captcha.text.producer.DefaultTextProducer;
import nl.captcha.text.renderer.DefaultWordRenderer;
/**
 * 简单的验证码(静态图片),不支持中文
 * SimpleCaptcha.java
 * @author James.pu Email: James.pu@gwtsz.com
 * Create Date:2013-10-17
 */
public class SimpleCaptcha {
	private static List<java.awt.Color> textColors = Arrays.asList(
			Color.BLACK, new Color(100, 25, 200), Color.BLUE, Color.RED);
	private static List<java.awt.Font> textFonts = Arrays.asList(
			new Font("Arial", Font.ITALIC,25), 
			new Font("Courier", Font.PLAIN, 25));
	private static char[] charCollection = {'A','B','C','D','E','F','G','H','G','K','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'
        ,'a','b','c','d','e','f','g','h','i','j','k','m','n','p','q','r','s','t','u','v','w','x','y','z','3','4','5','6','7','8','9'};
    /**
     * 获取验证码
     * @param width 生成的验证码图片宽度
     * @param height 生成的验证码图片高度
     * @param len    验证码字符数
     * @param out    输出流
     * @return 返回验证码内容
     */
	public static String captcha(int width,int height,int len,OutputStream out) {
        Captcha captcha = genCaptcha(width,height,len);
        String text="";
        try {
			ImageIO.write(captcha.getImage(), "png", out);
			text=captcha.getAnswer();
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
        return text;
    }
	
	private static Captcha genCaptcha(int width,int height,int len){
		 return new Captcha.Builder(width, height)
		 	.addNoise(new CurvedLineNoiseProducer(Color.YELLOW , 2f))
		 	.addText(new DefaultTextProducer(len, charCollection), 
		 			new DefaultWordRenderer(textColors, textFonts))
		 	.addBackground(new GradiatedBackgroundProducer(
		 			new Color(Randoms.num(128, 255), Randoms.num(128, 255), Randoms.num(128, 255)), 
		 			new Color(Randoms.num(128, 255), Randoms.num(128, 255), Randoms.num(128, 255))))
		 	.addNoise(new CurvedLineNoiseProducer(Color.GRAY , 1f))
		 	.addNoise(new CurvedLineNoiseProducer(Color.CYAN , 1f))
		 	.build(); 
	}
}
