package com.example.demo.cimg.data;

import org.springframework.web.multipart.MultipartFile;

public class CImgsDto {
    private String [] links;
    private MultipartFile [] files;

    public String[] getLinks() {
        return links;
    }

    public void setLinks(String[] links) {
        this.links = links;
    }

    public MultipartFile[] getFiles() {
        return files;
    }

    public void setFiles(MultipartFile[] files) {
        this.files = files;
    }
}
