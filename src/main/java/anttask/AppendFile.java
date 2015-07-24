package anttask;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import org.apache.commons.io.FileUtils;

public class AppendFile{
	
	/**
	 * 移除UTF-8的BOM
	 */
	private static void  removeBOM(File file) throws IOException {
		byte[] bs = FileUtils.readFileToByteArray(file);
		if (bs[0] == -17 && bs[1] == -69 && bs[2] == -65) {
			byte[] nbs = new byte[bs.length - 3];
			System.arraycopy(bs, 3, nbs, 0, nbs.length);
			FileUtils.writeByteArrayToFile(file, nbs);
		}
	}
	
	public static void main(String[] args) throws Exception {
		if(args.length == 2){
			String src = args[0];
			String dist = args[1];
			
			File srcFile = new File(src);
			AppendFile.removeBOM(srcFile);
			File distFile = new File(dist);
			
			distFile.createNewFile();
			
			BufferedReader reader = null;
			BufferedWriter writer = null;
			
			try{
				reader = new BufferedReader(new InputStreamReader(new FileInputStream(srcFile), "UTF8"));
				writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(distFile, true), "UTF8"));
				
				char[] buffer = new char[512];
				int len = reader.read(buffer);
				while(len > 0){
					//System.out.println(new String(buffer));
					writer.write(buffer, 0, len);
					len = reader.read(buffer);
				}
				writer.newLine();
			}finally{
				if(reader != null) reader.close();
				if( writer != null) writer.close();
			}
		}else{
			throw new Exception("Please input file path.");
		}
	}
	
}
