package com.example.demo.card.data;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardEntityRepository extends JpaRepository<CardEntity, Long> {
    Optional<CardEntity> findById(Long id);
    Page<CardEntity> findAll(Pageable pageable);
    Page<CardEntity> findByCategory(String category, Pageable pageable);
}
