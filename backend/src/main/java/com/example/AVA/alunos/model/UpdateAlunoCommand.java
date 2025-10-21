package com.example.AVA.alunos.model;

import lombok.Data;

@Data
public class UpdateAlunoCommand {
    private Integer id;
    private Aluno aluno;

    public UpdateAlunoCommand(Integer id, Aluno aluno) {
        this.id = id;
        this.aluno = aluno;
    }
}
