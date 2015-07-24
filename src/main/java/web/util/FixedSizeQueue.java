package web.util;

import java.util.Date;
import java.util.LinkedList;

public class FixedSizeQueue<T> {

	private LinkedList<Tobj> list = new LinkedList<Tobj>();

	private int size;
	private int retentionPeriod;

	public FixedSizeQueue(int size, int retentionPeriod) {
		this.size = size;
		this.retentionPeriod = retentionPeriod;
	}

	public synchronized boolean add(T e) {
		boolean result = list.add(new Tobj(new Date(), e));
		if (list.size() > size) {
			Tobj obj = list.peek();
			while(obj != null && obj.getTime().getTime() < System.currentTimeMillis() - retentionPeriod){
				list.poll();
				 obj = list.peek();
			}
		}
		return result;
	}

	public synchronized T poll() {
		Tobj obj = list.poll();
		if(obj != null){
			return obj.getObj();	
		}else{
			return null;
		}
	}
	
	public int size(){
		return list.size();
	}
	
	public synchronized boolean contains(T obj){
		return list.contains(new Tobj(new Date(), obj));
	}

	private class Tobj {
		private Date time;
		private T obj;
		
		public Tobj(Date time, T obj){
			this.time = time;
			this.obj = obj;
		}

		public Date getTime() {
			return time;
		}

		public T getObj() {
			return obj;
		}

		@Override
		public int hashCode() {
			return obj.hashCode();
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Tobj other = (Tobj) obj;
			if (!getOuterType().equals(other.getOuterType()))
				return false;
			if (this.obj == null) {
				if (other.obj != null)
					return false;
			} else if (!this.obj.equals(other.obj))
				return false;
			return true;
		}

		private FixedSizeQueue getOuterType() {
			return FixedSizeQueue.this;
		}

	}

}
