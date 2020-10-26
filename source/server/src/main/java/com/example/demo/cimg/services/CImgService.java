package com.example.demo.cimg.services;

import com.example.demo.cimg.data.CImgsDto;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileFilter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class CImgService implements InitializingBean {
    @Value("${filepath}")
    private String filepath;

    private List<String> cImgsLinks = new ArrayList<>();

    private void clearLinksAndFiles(String[] links){
        cImgsLinks.removeAll(Arrays.asList(links));
        for (String s: cImgsLinks){
            s = s.substring(4);
            String fpath = filepath + s;
            File f = new File(fpath);
            f.delete();
        }
        cImgsLinks.clear();
    }

    private void makeNewCImgsLinks(String[] links, MultipartFile[] files){
        try{
            if(files == null){
                for(String s: links) cImgsLinks.add(s);
            }
            else{
                int count = 0;

                for(String s: links){
                    if(s.equals("empty")){
                        MultipartFile file = files[count++];

                        String prefix = UUID.randomUUID().toString();
                        String postfix = file.getOriginalFilename();
                        String mfname = filepath +"/cimg/"+prefix+postfix;
                        String mfsrc = "/img/cimg/"+prefix+postfix;
                        file.transferTo(new File(mfname));
                        cImgsLinks.add(mfsrc);
                    }
                    else {
                        cImgsLinks.add(s);
                    }
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }

    }

    public void setCImgs(CImgsDto dto) throws Exception {
        String[] links = dto.getLinks();
        MultipartFile[] files = dto.getFiles();

        if(links == null) throw new Exception("Wrong parameters in setCImgs");
        if(links.length == 1 && links[0].equals("delete")){
            clearLinksAndFiles(new String[0]);
            return;
        }

        clearLinksAndFiles(links);
        makeNewCImgsLinks(links, files);

    }





    public CImgsDto getAllCImgs() {
        CImgsDto dto = new CImgsDto();
        dto.setFiles(null);
        dto.setLinks(cImgsLinks.toArray(new String[cImgsLinks.size()]));

        return dto;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        File dir = new File(filepath+"/cimg");
        File[] listf = dir.listFiles(new FileFilter() {
            @Override
            public boolean accept(File file) {
                if(file.isDirectory()) return false;
                else return true;
            }
        });

        for(File f : listf){
            cImgsLinks.add("/img"+f.getAbsolutePath().substring(filepath.length()));
        }
    }
}
