package com.example.demo.jwt.dao;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.Instant;

@Entity
public class RefreshTokenSessionEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String refreshToken;
    private String username;
    private String authorities;
    private Instant expiration;

    public RefreshTokenSessionEntity() {
    }

    public RefreshTokenSessionEntity(String refreshToken, String username, String authorities, Instant expiration) {
        this.refreshToken = refreshToken;
        this.username = username;
        this.authorities = authorities;
        this.expiration = expiration;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAuthorities() {
        return authorities;
    }

    public void setAuthorities(String authorities) {
        this.authorities = authorities;
    }

    public Instant getExpiration() {
        return expiration;
    }

    public void setExpiration(Instant expiration) {
        this.expiration = expiration;
    }
}
