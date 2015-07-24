package anttask;

import java.io.File;

/**
 * 
 * @author charles.so
 * 2014年4月1日
 */
public abstract class FileIterator implements Runnable{
    
    private File path;

    public FileIterator(File path){
        this.path = path;
    }

    public void run() {
        loopFile(path);
    }

    private void loopFile(File file){
        if(file.isFile()){
            execute(file);
        }else if(file.isDirectory()){
            File[] files = file.listFiles();
            for(int i = 0; i < files.length; i++){
                File f = files[i];
                loopFile(f);
            }
        }
    }

    public abstract void execute(File file);

}

