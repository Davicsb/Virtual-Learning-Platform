package com.example.AVA.curso.model;

import lombok.Data;

@Data
public class UpdateCursoCommand {
    private Integer id;
    private Curso curso;

    public UpdateCursoCommand(Integer id, Curso curso){
        this.id = id;
        this.curso = curso;
    }
}
