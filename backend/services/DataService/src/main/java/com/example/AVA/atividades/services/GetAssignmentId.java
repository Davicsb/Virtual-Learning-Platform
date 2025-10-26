package com.example.AVA.atividades.services;

import com.example.AVA.Query;
import com.example.AVA.atividades.AssignmentsRepository;
import com.example.AVA.atividades.model.Assignment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetAssignmentId implements Query<Integer, Assignment> {

    private final AssignmentsRepository assignmentsRepository;

    public GetAssignmentId(AssignmentsRepository assignmentsRepository) {
        this.assignmentsRepository = assignmentsRepository;
    }

    @Override
    public ResponseEntity<Assignment> execute(Integer input) {
        Optional<Assignment> assignmentOptional = assignmentsRepository.findById(input);

        if (assignmentOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(assignmentOptional.get());
        }
        throw new RuntimeException("Atividade não encontrada");
    }
}
