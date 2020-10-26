package com.example.demo.jwt.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenSessionEntityRepo extends JpaRepository<RefreshTokenSessionEntity, Long> {

    Optional<RefreshTokenSessionEntity> findByIdAndUsername(Long sessionId, String username);
}
