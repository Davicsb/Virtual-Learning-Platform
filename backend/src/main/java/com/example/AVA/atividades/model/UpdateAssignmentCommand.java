package com.example.AVA.atividades.model;

import lombok.Data;

@Data
public class UpdateAssignmentCommand {
    private Integer id;
    private Assignment assignment;

    public UpdateAssignmentCommand(Integer id, Assignment assignment){
        this.id = id;
        this.assignment = assignment;
    }
}
