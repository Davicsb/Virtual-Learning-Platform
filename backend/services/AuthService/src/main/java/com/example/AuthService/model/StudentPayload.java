package com.example.AuthService.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class StudentPayload {
    private String name;

    private IdAbstraction course; //Vários alunos podem pertencer a um curso

    private List<IdAbstraction> turmas;

    private Integer userId;
}
