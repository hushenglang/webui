package web.util;

import org.apache.log4j.Logger;

public abstract class LazyRefreshable<T> {
	
	private final static Logger logger = Logger.getLogger(LazyRefreshable.class);
	
	private int intervalInMs;
	private T obj;
	private long lastUpdateTime = 0;
	
	public LazyRefreshable(int intervalInMs){
		this.intervalInMs = intervalInMs;
	}
	
	public synchronized T get(){
		if(obj == null){
			load();
		}else if (lastUpdateTime < System.currentTimeMillis() - intervalInMs){
			load();
		}
		return obj;
	}
	
	public synchronized T load(){
		obj = refresh();
		lastUpdateTime = System.currentTimeMillis();
		return obj;
	}
	
	protected abstract T refresh();

}
