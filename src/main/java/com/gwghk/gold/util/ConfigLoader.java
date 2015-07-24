package com.gwghk.gold.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

public class ConfigLoader {

	private static Logger logger = Logger.getLogger(ConfigLoader.class);
	
	private static ConfigLoader configLoader;
	private String configPath;
	
	private ConfigLoader(){
		InputStream in = this.getClass().getResourceAsStream("/ConfigLoader.properties");
		if(in != null){
			Properties properties = new Properties();
			try {
				properties.load(in);
				configPath = properties.getProperty("configPath");
				logger.info("configPath: " + configPath);
			} catch (IOException e) {
				logger.error("", e);
			}finally{
				try {
					in.close();
				} catch (IOException e) {
					logger.error("", e);
				}
			}
		}
	}
	
	public static ConfigLoader getInstance(){
		if(configLoader == null){
			configLoader = new ConfigLoader();
		}
		return configLoader;
	}
	
	public InputStream getResourceAsStream(String path){
		if(StringUtils.isNotEmpty(configPath)){
			File file = new File(concatFilepath(configPath, path));
			if(file.exists() && file.isFile()){
				try {
					logger.info("Load config file from " + file.getPath());
					return new FileInputStream(file);
				} catch (FileNotFoundException e) {
					logger.error("never thrown", e);
					return null;
				}	
			}else{
				logger.info(configPath + " not existed. Using lcoal resource.");
			}
		}
		logger.info("Get local resource file " + path);
		return this.getClass().getResourceAsStream(path);
	}
	
	public Properties getProperties(String path){
		Properties properties = new Properties(); 
		InputStream in = getResourceAsStream(path);
		try {
			try{
				properties.load(in);	
			}finally{
				if(in != null) in.close();
			}
		} catch (IOException e) {
			logger.error("", e);
		}
		return properties;
	}
	
	private static String concatFilepath(String basepath, String path){
		path = StringUtils.trim(path);
		basepath = StringUtils.trim(basepath);
		path = path.replaceFirst("^[\\\\\\/]", "");
		basepath = basepath.replaceFirst("[\\\\\\/]$", "");
		return basepath + File.separator + path;
	}
	
	public static void main(String[] args){		
		Properties properties = ConfigLoader.getInstance().getProperties("/goldoffice.properties");
		System.out.println(properties.get("url"));
	}
	
}
