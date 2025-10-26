package com.example.AVA.turma.model;

import lombok.Data;

@Data
public class UpdateTurmaCommand {
    private Integer id;
    private Turma turma;

    public UpdateTurmaCommand(Integer id, Turma turma){
        this.id = id;
        this.turma = turma;
    }
}
