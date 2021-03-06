package com.example.demo.jwt.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomUserDetailsRepo extends JpaRepository<CustomUserDetails, Long> {
    public Optional<CustomUserDetails> findByUsername(String username);
}
