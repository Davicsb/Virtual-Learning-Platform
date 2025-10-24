package com.example.AVA.tutors.model;

import com.example.AVA.curso.model.Curso;
import com.example.AVA.turma.model.Turma;
import com.example.AVA.util.UserType;
import jakarta.persistence.Entity;
import lombok.Data;

import java.util.List;

@Data
public class UserPayload {
    private String email;

    private String password;

    private Integer userId;
}
