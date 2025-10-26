package com.example.AVA.atividades.services;

import com.example.AVA.Command;
import com.example.AVA.atividades.AssignmentsRepository;
import com.example.AVA.atividades.model.Assignment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeleteAssignment implements Command<Integer, Void> {

    private final AssignmentsRepository assignmentsRepository;

    public DeleteAssignment(AssignmentsRepository assignmentsRepository) {
        this.assignmentsRepository = assignmentsRepository;
    }

    @Override
    public ResponseEntity<Void> execute(Integer input) {
        Optional<Assignment> assignmentOptional = assignmentsRepository.findById(input);
        if (assignmentOptional.isPresent()) {
            assignmentsRepository.deleteById(input);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        throw new RuntimeException("Atividade não encontrada");
    }
}
