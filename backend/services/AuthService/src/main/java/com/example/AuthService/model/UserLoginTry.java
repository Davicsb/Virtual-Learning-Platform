package com.example.AuthService.model;

import com.example.AuthService.util.UserType;
import lombok.Data;

@Data
public class UserLoginTry {
    private String email;
    private String password;
    private UserType type;

    public UserLoginTry(String email, String password, UserType type){
        this.email =email;
        this.password = password;
        this.type = type;
    }
}
