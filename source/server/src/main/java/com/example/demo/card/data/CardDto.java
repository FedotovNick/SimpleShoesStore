package com.example.demo.card.data;

import org.springframework.web.multipart.MultipartFile;

public class CardDto {
    private Long id;
    private String title;
    private String description;
    private Integer price;
    private Integer sizefrom;
    private Integer sizeto;
    private MultipartFile[] files;
    private String[] links;
    private String category;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getSizefrom() {
        return sizefrom;
    }

    public void setSizefrom(Integer sizefrom) {
        this.sizefrom = sizefrom;
    }

    public Integer getSizeto() {
        return sizeto;
    }

    public void setSizeto(Integer sizeto) {
        this.sizeto = sizeto;
    }

    public MultipartFile[] getFiles() {
        return files;
    }

    public void setFiles(MultipartFile[] files) {
        this.files = files;
    }

    public String[] getLinks() {
        return links;
    }

    public void setLinks(String[] links) {
        this.links = links;
    }
}
