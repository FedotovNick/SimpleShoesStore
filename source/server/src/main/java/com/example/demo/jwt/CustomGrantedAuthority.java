package com.example.demo.jwt;

import org.springframework.security.core.GrantedAuthority;

public enum CustomGrantedAuthority implements GrantedAuthority {
    ROLE_ADMIN, ROLE_USER;

    @Override
    public String getAuthority() {
        return name();
    }
}
