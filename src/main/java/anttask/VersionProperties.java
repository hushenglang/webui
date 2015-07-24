package anttask;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Properties;

import net.sourceforge.tranxbean.TransXmlBean;

public class VersionProperties {

	public static void main(String[] args) throws Exception {
		
		if(args.length != 2){
			return;
		}
		String propertiesPath = args[0];
		String versionXmlPath = args[1];
		
		TransXmlBean txf = new TransXmlBean();
		VersionControlRecordList recordList = txf.load(VersionControlRecordList.class, versionXmlPath, "UTF-8");
		
		if(recordList != null) {
			VersionControlRecord versionControlRecord = recordList.get(0);
			Properties p = new Properties();
			p.setProperty("version.version", versionControlRecord.getVersion());
			p.setProperty("version.date", versionControlRecord.getDate());
			p.setProperty("version.programmer", versionControlRecord.getProgrammer());
			p.setProperty("version.module", versionControlRecord.getModule());
			p.setProperty("version.function", versionControlRecord.getFunction());
			p.setProperty("version.comment", versionControlRecord.getComment());
			p.setProperty("version.tag", versionControlRecord.getTag());
			File pFile = new File(propertiesPath);
			if(!pFile.exists()){
				pFile.createNewFile();	
			}
			p.store(new FileOutputStream(pFile), "version properties");
			
		}
	}
	
}
