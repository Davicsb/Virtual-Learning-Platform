package com.example.AVA.tutors.model;

import lombok.Data;

@Data
public class UpdateTutorCommand {
    private Integer id;
    private Tutor tutor;

    public UpdateTutorCommand(Integer id, Tutor tutor) {
        this.id = id;
        this.tutor = tutor;
    }
}
