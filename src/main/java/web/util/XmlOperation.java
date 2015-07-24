package web.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.StringReader;
import java.io.StringWriter;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.ValidationEvent;
import javax.xml.bind.ValidationEventHandler;
import javax.xml.bind.ValidationEventLocator;
import javax.xml.namespace.QName;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;

import org.apache.log4j.Logger;
import org.xml.sax.SAXException;

public class XmlOperation {
	private static final Logger	logger = Logger.getLogger(XmlOperation.class);
	private static final String	DEFAULT_ENCODING	= "UTF-8";

	private static class ToolHelp {
		private static final XmlOperation	singObj	= new XmlOperation();
	}

	private XmlOperation() {
	}

	public static XmlOperation getInstance() {
		return ToolHelp.singObj;
	}

	public String postXmlForAnnotation(Class classname, Object object, String url) {
		Package pack = classname.getPackage();
		String packageName = pack.getName();
		logger.debug("Package Name = " + packageName);
		String xmlString = "";
		try {
			JAXBContext ctx = JAXBContext.newInstance(packageName);
			Marshaller m = ctx.createMarshaller();
			StringWriter xml = new StringWriter();
			m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			m.setProperty(Marshaller.JAXB_ENCODING, DEFAULT_ENCODING);
			m.marshal(object, xml);
			String urlParam = xml.toString();
			xmlString = HttpUrl.sendPost(url, urlParam);
			logger.debug("xmlString:" + xmlString);
		} catch (JAXBException e) {
			
			logger.error("e.getMessage():" + e.getMessage());
		}
		return xmlString;

	}

	public String postXmlForClass(Class classname, Object object, String url) {
		String xmlString = "";
		try {
			JAXBContext jc = JAXBContext.newInstance(classname);
			// String
			// name=classname.getSimpleName().substring(0,1).toLowerCase()+classname.getSimpleName().substring(1,classname.getSimpleName().length());
			String name = "Data";
			JAXBElement<Object> je2 = new JAXBElement<Object>(new QName(name), classname, object);
			Marshaller marshaller = jc.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			StringWriter xml = new StringWriter();
			marshaller.setProperty(Marshaller.JAXB_ENCODING, DEFAULT_ENCODING);
			marshaller.marshal(je2, xml);
			logger.debug("xml.toString():" + xml.toString());
			xmlString = HttpUrl.sendPost(url, xml.toString());
		} catch (JAXBException e) {
			
			logger.error("e.getMessage():" + e.getMessage());
		}
		return xmlString;

	}

	public Object parseXmlForAnnotation(Class classname, String xmlString) {
		Package pack = classname.getPackage();
		String packageName = pack.getName();
		Object object = null;
		try {
			JAXBContext ctx = JAXBContext.newInstance(packageName);

			Unmarshaller um = ctx.createUnmarshaller();
			// um.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
			object = um.unmarshal(new StreamSource(new StringReader(xmlString)));

		} catch (JAXBException e) {
			
			logger.error("e.getMessage():" + e.getMessage());
		}
		return object;

	}

	public Object parseXmlForClass(Class classname, Object object, String xml) {
		try {
			JAXBContext jc = JAXBContext.newInstance(classname);
			StreamSource xml2 = new StreamSource(new StringReader(xml));
			logger.debug("object:" + xml.toString());
			Unmarshaller unmarshaller = jc.createUnmarshaller();
			JAXBElement<Object> je1 = unmarshaller.unmarshal(xml2, classname);
			object = je1.getValue();
			logger.debug("object:" + object.toString());
		} catch (Exception e) {
			logger.error("e.getMessage():" + e.getMessage());
		}
		
		return object;
	}
	public Object parseXmlForClassWithoutLog(Class classname, Object object, String xml) {
		try {
			JAXBContext jc = JAXBContext.newInstance(classname);
			StreamSource xml2 = new StreamSource(new StringReader(xml));
			logger.debug("object:" + xml.toString());
			Unmarshaller unmarshaller = jc.createUnmarshaller();
			JAXBElement<Object> je1 = unmarshaller.unmarshal(xml2, classname);
			object = je1.getValue();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("e.getMessage():" + e.getMessage());
			
		}
		
		
		return object;
	}

	public Object postAndParseXmlForClass(Class classname, Object object, String url) {
		try {
			JAXBContext jc = JAXBContext.newInstance(classname);
			// String
			// name=classname.getSimpleName().substring(0,1).toLowerCase()+classname.getSimpleName().substring(1,classname.getSimpleName().length());
			String name = "Data";
			JAXBElement<Object> je2 = new JAXBElement<Object>(new QName(name), classname, object);
			Marshaller marshaller = jc.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			StringWriter xml = new StringWriter();
			marshaller.marshal(je2, xml);

			// String xml3=xml.toString().replaceAll("fproposalParam", "Result");
			logger.debug("xml.toString():" + xml.toString());
			StreamSource xml2 = new StreamSource(new StringReader(xml.toString()));
			Unmarshaller unmarshaller = jc.createUnmarshaller();
			JAXBElement<Object> je1 = unmarshaller.unmarshal(xml2, classname);
			object = je1.getValue();
			logger.debug("object:" + object.toString());
		} catch (JAXBException e) {
			
			logger.error("e.getMessage():" + e.getMessage());
		}
		return object;

	}

	public Object postAndParseXmlForAnnotation(Class classname, Object object, String url) {
		// Class classname=object.getClass();
		Package pack = classname.getPackage();
		String packageName = pack.getName();
		try {
			JAXBContext ctx = JAXBContext.newInstance(packageName);
			Marshaller m = ctx.createMarshaller();
			StringWriter xml = new StringWriter();
			m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			m.marshal(object, xml);

			String urlParam = xml.toString();
			String xmlString = HttpUrl.sendPost(url, urlParam);

			Unmarshaller um = ctx.createUnmarshaller();
			object = um.unmarshal(new StreamSource(new StringReader(xmlString)));

		} catch (JAXBException e) {
			logger.error("e.getMessage():" + e.getMessage());
		}
		return object;
	}

	public static void objectToXml(JAXBContext jc, JAXBElement<?> element, final String xmlPath, String encoding) {
		try {
			Marshaller m = jc.createMarshaller();

			m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			encoding = encoding == null ? DEFAULT_ENCODING : encoding;
			m.marshal(element, System.out);
			m.setProperty("jaxb.encoding", encoding);
			OutputStream out = new FileOutputStream(new File(xmlPath));
			m.marshal(element, out);
			out.flush();
			out.close();
		} catch (JAXBException e) {
			logger.error("e.getMessage():" + e.getMessage());
		} catch (FileNotFoundException e) {
			logger.error("e.getMessage():" + e.getMessage());
		} catch (IOException e) {
			logger.error("e.getMessage():" + e.getMessage());
		}
	}

	public static void objectToXml(JAXBContext jc, JAXBElement<?> element, final String xmlPath) {
		objectToXml(jc, element, xmlPath, null);
	}

	public static Object xmlToObject(Unmarshaller u, final String xmlPath) {
		Object obj = null;
		try {
			JAXBElement<?> je = (JAXBElement<?>) u.unmarshal(new FileInputStream(xmlPath));
			obj = je.getValue();
		} catch (FileNotFoundException e) {
			logger.error("e.getMessage():" + e.getMessage());
		} catch (JAXBException e) {
			logger.error("e.getMessage():" + e.getMessage());
		}
		return obj;
	}

	public static Unmarshaller validate(JAXBContext jc, String xsdPath) {
		Unmarshaller u = null;
		try {
			u = jc.createUnmarshaller();
			SchemaFactory sf = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
			Schema schema = sf.newSchema(new File(xsdPath));
			u.setSchema(schema);
			u.setEventHandler(new ValidationEventHandler() {
				@Override
				public boolean handleEvent(ValidationEvent ve) {
					if (ve.getSeverity() == ValidationEvent.ERROR || ve.getSeverity() != ValidationEvent.WARNING) {
						ValidationEventLocator vel = ve.getLocator();
						logger.error("Line:Col[" + vel.getLineNumber() + ":" + vel.getColumnNumber() + "]:" + ve.getMessage());
						return false;
					}
					return true;
				}
			});
		} catch (SAXException e) {
			logger.error("SAXException error.");
		} catch (JAXBException e) {
			logger.error("JAXBException error.");
		}
		return u;
	}

}
