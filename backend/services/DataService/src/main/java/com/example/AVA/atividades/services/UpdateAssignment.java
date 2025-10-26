package com.example.AVA.atividades.services;

import com.example.AVA.Query;
import com.example.AVA.atividades.AssignmentsRepository;
import com.example.AVA.atividades.model.Assignment;
import com.example.AVA.atividades.model.UpdateAssignmentCommand;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UpdateAssignment implements Query<UpdateAssignmentCommand, Assignment> {

    private final AssignmentsRepository assignmentsRepository;

    public UpdateAssignment(AssignmentsRepository assignmentsRepository) {
        this.assignmentsRepository = assignmentsRepository;
    }

    @Override
    public ResponseEntity<Assignment> execute(UpdateAssignmentCommand input) {
        Optional<Assignment> assignmentOptional = assignmentsRepository.findById(input.getId());

        if (assignmentOptional.isPresent()){
            Assignment newAssignment = input.getAssignment();
            newAssignment.setId(input.getId());
            assignmentsRepository.save(newAssignment);
            return ResponseEntity.status(HttpStatus.OK).body(newAssignment);
        }
        throw new RuntimeException("Atividade não encontrada");
    }
}
