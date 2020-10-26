package com.example.demo.customer.data;

import java.util.List;

public class OrdersPageDto {
    private List<OrderDto> orders;

    public List<OrderDto> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderDto> orders) {
        this.orders = orders;
    }
}
