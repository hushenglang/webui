<%@ page contentType="text/html; charset=utf-8" 
import="java.awt.*,java.awt.image.*,com.sun.image.codec.jpeg.*,
java.util.*,javax.imageio.ImageIO,javax.imageio.stream.ImageOutputStream,java.io.ByteArrayInputStream,java.io.ByteArrayOutputStream"%>
<%!
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
%>
<%

	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", 0);


	response.setContentType("image/jpeg");
	response.addHeader("pragma","NO-cache");
	response.addHeader("Cache-Control","no-cache");
	response.addDateHeader("Expries",0);
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
    	g.drawString(rand,13*i+7,20);
	}
	session.setAttribute("random",sRand);
	//logger.debug("image.jsp-------"+"session ramdom "+session.getAttribute("random")+"-------"+"id:"+session.getId());
	g.dispose();
	
	
	ServletOutputStream outStream=null ;
	outStream = response.getOutputStream();
	ImageOutputStream imageOut = ImageIO.createImageOutputStream(outStream);
	ImageIO.write(image, "JPEG", imageOut);
	imageOut.close();

	outStream.close();
	out.clear();
	
	
	out = pageContext.pushBody();
%>
