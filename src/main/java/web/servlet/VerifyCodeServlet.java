package web.servlet;

import java.awt.Font;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import captcha.SimpleCaptcha;
import captcha.SimpleCaptchaBlan;
import captcha.SimpleCaptchaLine;
import captcha.SuperCaptcha;
import captcha.SuperSpecCaptcha;
import captcha.util.Randoms;

@SuppressWarnings("serial")
public class VerifyCodeServlet extends HttpServlet {
	static Logger logger = Logger.getLogger(VerifyCodeServlet.class);
	
	private InputStream imageStream = new ByteArrayInputStream(new byte[0]);  
	
	final String ENCODING_TOMCAT_URL_GBK = "GBK";

    public VerifyCodeServlet() {
        super();
    }

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		perform(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		perform(request, response);
	}

	private void perform(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String type=String.valueOf(Randoms.num(1, 5));
		response.setContentType("image/jpeg");
		response.addHeader("pragma","NO-cache");
		response.addHeader("Cache-Control","no-cache");
		response.addDateHeader("Expries",0);
		int width=66;//验证码图片宽度
		int height=28;//验证码图片高度
		ByteArrayInputStream in=null;
		if("1".equals(type)){//png格式验证码
			SuperCaptcha captcha = new SuperSpecCaptcha(width,height,4,new Font("Times New Roman",Font.PLAIN,20));
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			captcha.out(out);
			request.getSession(true).setAttribute("random", captcha.text().toLowerCase());
			in=new ByteArrayInputStream(out.toByteArray());
		}
		else if("2".equals(type)){
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			String text=SimpleCaptcha.captcha(width, height, 4, out);
			request.getSession(true).setAttribute("random",text.toLowerCase());
			in=new ByteArrayInputStream(out.toByteArray());
		}
		else if("3".equals(type)){
			SimpleCaptchaBlan blan=new SimpleCaptchaBlan();
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			String text=blan.captcha(width, height, 4, out);
			request.getSession(true).setAttribute("random",text.toLowerCase());
			in=new ByteArrayInputStream(out.toByteArray());
		}
		else if("4".equals(type)){
			SimpleCaptchaLine line=new SimpleCaptchaLine();
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			String text=line.captcha(width, height, 4, out);
			request.getSession(true).setAttribute("random",text.toLowerCase());
			in=new ByteArrayInputStream(out.toByteArray());
		}
		BufferedImage image = ImageIO.read(in);
		try {
			ServletOutputStream outStream=null ;
			outStream = response.getOutputStream();
			ImageOutputStream imageOut = ImageIO.createImageOutputStream(outStream);
			ImageIO.write(image, "JPEG", imageOut);
			imageOut.close();
		} catch (IOException e) {
			logger.warn ("", e);
//			throw new Exception (e);
			System.out.println("error");
		}
	}

	public InputStream getImageStream() {   
		return imageStream;   
	}
}
