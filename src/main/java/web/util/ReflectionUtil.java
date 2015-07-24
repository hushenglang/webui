package web.util;

import java.lang.reflect.Constructor;

import org.apache.commons.beanutils.DynaProperty;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.beanutils.WrapDynaBean;
import org.apache.log4j.Logger;


/**
 *
 */
public class ReflectionUtil {
	
	private static final Logger log = Logger.getLogger(ReflectionUtil.class);
	
	protected ReflectionUtil() {
	}
	/**
	 * All non-index properties only
	 * @param source
	 * @param target
	 */
	public static void copyPropertiesIfNotNull(Object source, Object target) {
		WrapDynaBean sourceWrapDynaBean = new WrapDynaBean(source);
		WrapDynaBean targetWrapDynaBean = new WrapDynaBean(target);
		
		DynaProperty[] dynaProperties = targetWrapDynaBean.getDynaClass().getDynaProperties();
		for (DynaProperty dynaProperty : dynaProperties) {
			String name = dynaProperty.getName();
//			log.debug("dynaProperty = "+dynaProperty + ",name = "+name);
			try {
				Object value = sourceWrapDynaBean.get(name);
//				log.debug("value = "+value);
				if (value != null) {
					targetWrapDynaBean.set(name, value);
				}
			} catch (Exception e) {
				//e.printStackTrace();
			}
		}
	}
	
	public static Object getProperty(Object obj, String propertyName) {
		try {
			return PropertyUtils.getProperty(obj, propertyName);
		} catch (Exception e) {
			// e.printStackTrace();
			return null;
		}
	}
	public static void setProperty(Object obj, String propertyName,
			Object propertyValue) {
		try {
			PropertyUtils.setProperty(obj, propertyName, propertyValue);
		} catch (Exception e) {
			// e.printStackTrace();
		}
	}
	
	public static Object createClass(String name,Object []o) throws Exception//自动找到合适的构造方法并构造
	{
	   Class myClass =Class.forName(name);
	   Class[] argsClass = new Class[o.length];
	   for (int i = 0; i< o.length; i++) {
		   log.debug("o[" + i + "]:" + o[i]);
	       argsClass[i] = o[i].getClass();
	   }
	   
	   try {
		   Constructor cons = myClass.getConstructor(argsClass);
		   return cons.newInstance(o);
	   } catch (Exception e) {
		   log.error("instance error", e);
		   return myClass.newInstance();
	   }
	}
}
