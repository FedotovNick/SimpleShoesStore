package com.example.demo.card.data;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="card")
public class CardEntity {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String description;
    private Integer price;
    private Integer sizefrom;
    private Integer sizeto;
    private String category;

    @ElementCollection(fetch=FetchType.EAGER)
    @CollectionTable(name="image_links")
    private List<String> links = new ArrayList<>();

    public CardEntity(String title, String description, Integer price, Integer sizefrom, Integer sizeto, List<String> links, String category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.sizefrom = sizefrom;
        this.sizeto = sizeto;
        this.links = links;
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public CardEntity() {
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

    public List<String> getLinks() {
        return links;
    }

    public void setLinks(List<String> links) {
        this.links = links;
    }
}
