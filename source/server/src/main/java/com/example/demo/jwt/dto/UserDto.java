package com.example.demo.jwt.dto;

import javax.validation.constraints.Pattern;

public class UserDto {
    @Pattern(regexp="[a-zA-Z0-9]{5,8}")
    private String username;

    @Pattern(regexp="[a-zA-Z0-9]{5,32}")
    private String password;

    @Pattern(regexp="[a-zA-Z0-9]{5,32}")
    private String newPassword;

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
