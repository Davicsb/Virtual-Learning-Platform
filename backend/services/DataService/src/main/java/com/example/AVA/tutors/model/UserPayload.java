package com.example.AVA.tutors.model;

import lombok.Data;

@Data
public class UserPayload {
    private String email;

    private String password;

    private Integer userId;
}
