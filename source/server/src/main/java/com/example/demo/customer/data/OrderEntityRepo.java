package com.example.demo.customer.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderEntityRepo extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findById(Long id);
    Optional<OrderEntity> findByPhone(String phone);
}
