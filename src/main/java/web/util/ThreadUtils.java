package web.util;

public class ThreadUtils {

	public static String getCurrentMethod(){
		StackTraceElement[] stackTraceElements = Thread.currentThread().getStackTrace();
		if(stackTraceElements.length > 2){
			StackTraceElement st = stackTraceElements[2];
			StringBuilder sb = new StringBuilder();
			sb.append(st.getClassName());
			sb.append(".");
			sb.append(st.getMethodName());
			sb.append(":");
			sb.append(st.getLineNumber());
			return sb.toString();
		}
		return "";
	}
}
