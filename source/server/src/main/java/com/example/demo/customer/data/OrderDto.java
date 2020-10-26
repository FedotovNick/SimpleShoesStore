package com.example.demo.customer.data;

public class OrderDto {
    private Long id;



    private String name;
    private String surname;
    private String phone;
    private Long[] card_ids;
    private Integer[] sizes;
    private OrderCard[] cards;

    public OrderCard[] getCards() {
        return cards;
    }

    public void setCards(OrderCard[] cards) {
        this.cards = cards;
    }

    public OrderDto() {
    }

    public Integer[] getSizes() {
        return sizes;
    }

    public void setSizes(Integer[] sizes) {
        this.sizes = sizes;
    }

    public OrderDto(String name, String surname, String phone, Long[] card_ids, Integer[] sizes, OrderCard[] cards) {
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.card_ids = card_ids;
        this.sizes = sizes;
        this.cards = cards;

    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Long[] getCard_ids() {
        return card_ids;
    }

    public void setCard_ids(Long[] card_ids) {
        this.card_ids = card_ids;
    }
}
