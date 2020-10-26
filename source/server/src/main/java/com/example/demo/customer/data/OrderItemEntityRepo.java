package com.example.demo.customer.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemEntityRepo extends JpaRepository<OrderItemEntity, Long> {
    List<OrderItemEntity> findByCardId(Long id);
}
