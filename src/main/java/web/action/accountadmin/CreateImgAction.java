package web.action.accountadmin;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;
 
/**
 * 
 * Description: 生成验证码图片，并将验证码内容放在session：　random中
 * @author Scott Li Email:scott@222m.net
 * @version 1.0 Create Time: 上午9:17:17 2014年3月11日
 * Update Time:
 */
public class CreateImgAction  extends ActionSupport implements ServletRequestAware, ServletResponseAware {
	private static final long serialVersionUID = 1L;
	
	protected HttpServletRequest request;
	protected HttpServletResponse response;
	public ByteArrayInputStream inputStream;
	
	@Override
	public String execute() {
		return createImg();
	}

	/*
	 * 验证码开始
	 */
	private String createImg()  {
		// 在内存中创建图象
		Random random = new Random();
		int width=62, 
		height=28;
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics g = image.getGraphics();
		g.setColor(getRandColor(180,250));
		g.fillRect(0, 0, width, height);
		g.setFont(new Font("Times New Roman",Font.PLAIN,18));
		g.setColor(new Color(random.nextInt(130),random.nextInt(180),random.nextInt(200)));
		g.drawRect(0,0,width-1,height-1);

		String sRand="";
		for (int i=0;i<4;i++){
	    	String rand=String.valueOf(random.nextInt(10));
	    	sRand+=rand;
	    	g.setColor(new Color(50+random.nextInt(110),50+random.nextInt(110),50+random.nextInt(110)));//调用函数出来的颜色相同，可能是因为种子太接近，所以只能直接生成
	    	g.drawString(rand,13*i+6,16);
		}
		request.getSession().setAttribute("random",sRand);
		g.dispose();
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		ByteArrayInputStream input = new ByteArrayInputStream(output.toByteArray());
		this.setInputStream(input);
		return SUCCESS;
	}

	Color getRandColor(int fc,int bc){//
		Random random = new Random();
		if (fc>255) 
			fc=255;
		if (bc>255) 
			bc=255;
		int r = fc+random.nextInt(bc-fc);
		int g = fc+random.nextInt(bc-fc);
		int b = fc+random.nextInt(bc-fc);
		return new Color(r,g,b);
	}

	public ByteArrayInputStream getInputStream() {
		return inputStream;
	}

	public void setInputStream(ByteArrayInputStream inputStream) {
		this.inputStream = inputStream;
	}

	@Override
	public void setServletResponse(HttpServletResponse arg0)
	{
		response=arg0;
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0)
	{
		request=arg0;
	}
	
	

}
