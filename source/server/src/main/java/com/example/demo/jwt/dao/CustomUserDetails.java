package com.example.demo.jwt.dao;

import com.example.demo.jwt.CustomGrantedAuthority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="myuser")
public class CustomUserDetails implements UserDetails {
    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String password;


    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<CustomGrantedAuthority> authorities = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public CustomUserDetails() {
    }

    public CustomUserDetails(String username, String password, List<CustomGrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public List<CustomGrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<CustomGrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
