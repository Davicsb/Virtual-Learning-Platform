package com.example.AVA.tutors.model;

import com.example.AVA.turma.model.Turma;
import lombok.Data;

import java.util.List;

@Data
public class UserTutorCommand {
    private String name;

    private List<Turma> turmas;

    private String email;

    private String password;

}
