package com.example.demo.customer.data;

public class OrderCard {
    private String title;
    private Integer size;
    private Integer price;

    public OrderCard(String title, Integer size, Integer price) {
        this.title = title;
        this.size = size;
        this.price = price;
    }

    public OrderCard() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
