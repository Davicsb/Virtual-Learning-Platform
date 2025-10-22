package com.example.AVA.atividades.services;

import com.example.AVA.Command;
import com.example.AVA.atividades.AssignmentsRepository;
import com.example.AVA.atividades.model.Assignment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CreateAssignment implements Command<Assignment, Assignment> {

    private final AssignmentsRepository assignmentsRepository;

    public CreateAssignment(AssignmentsRepository assignmentsRepository) {
        this.assignmentsRepository = assignmentsRepository;
    }

    @Override
    public ResponseEntity<Assignment> execute(Assignment input) {
        Assignment savedAssignment = assignmentsRepository.save(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAssignment);
    }
}
