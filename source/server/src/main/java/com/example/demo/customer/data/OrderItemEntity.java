package com.example.demo.customer.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class OrderItemEntity {
    @Id
    @GeneratedValue
    private Long id;

    private Long cardId;
    private Integer size;

    public OrderItemEntity() {
    }

    public OrderItemEntity(Long cardId, Integer size) {
        this.cardId = cardId;
        this.size = size;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }
}
