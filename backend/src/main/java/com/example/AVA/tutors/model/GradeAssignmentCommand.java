package com.example.AVA.tutors.model;

import lombok.Data;

@Data
public class GradeAssignmentCommand {
    private Integer alunoId;
    private Integer atividadeId;
    private Double grade;

    public GradeAssignmentCommand(Double grade, Integer atividadeId, Integer alunoId) {
        this.grade = grade;
        this.atividadeId = atividadeId;
        this.alunoId = alunoId;
    }
}
