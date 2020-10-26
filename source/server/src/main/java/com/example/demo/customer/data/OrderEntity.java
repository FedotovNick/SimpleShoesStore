package com.example.demo.customer.data;

import com.example.demo.card.data.CardEntity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="order_entity")
public class OrderEntity {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String surname;
    private String phone;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemEntity> orderItems;

    public OrderEntity() {
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

    public List<OrderItemEntity> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemEntity> orderItems) {
        this.orderItems = orderItems;
    }
}
