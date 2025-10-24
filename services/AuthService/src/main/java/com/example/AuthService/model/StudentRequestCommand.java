package com.example.AuthService.model;

import com.example.AuthService.util.UserType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class StudentRequestCommand {
    private String name;

    private IdAbstraction course; //Vários alunos podem pertencer a um curso

    private List<IdAbstraction> turmas;

    private Integer userId;

    private String email;

    private String password;
}
