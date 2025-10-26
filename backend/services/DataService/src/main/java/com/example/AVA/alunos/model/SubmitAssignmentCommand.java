package com.example.AVA.alunos.model;

import lombok.Data;

@Data
public class SubmitAssignmentCommand {
    private Integer alunoId;
    private Integer atividadeId;

    public SubmitAssignmentCommand(Integer atividadeId, Integer alunoId) {
        this.atividadeId = atividadeId;
        this.alunoId = alunoId;
    }
}
