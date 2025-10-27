package com.example.AuthService.model;

import lombok.Data;

@Data
public class LoginServiceCommand {
    private String token;
    private CustomUser user;

    public LoginServiceCommand(String token, CustomUser user){
        this.token = token;
        this.user = user;
    }
}
