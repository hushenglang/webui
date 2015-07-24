package web.util;

/**
 * 
 * @author Charles
 *
 */
public class P {
	public String name;
	public String value;
	
	public P(String name, String value){
		this.name = name;
		this.value = value; 
	}
	
	public P p(String name, String value){
		return new P(name, value);
	}
}
