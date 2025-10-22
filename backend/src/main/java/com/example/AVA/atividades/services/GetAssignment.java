package com.example.AVA.atividades.services;

import com.example.AVA.Query;
import com.example.AVA.atividades.AssignmentsRepository;
import com.example.AVA.atividades.model.Assignment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetAssignment implements Query<Void, List<Assignment>> {

    private final AssignmentsRepository assignmentsRepository;

    public GetAssignment(AssignmentsRepository assignmentsRepository) {
        this.assignmentsRepository = assignmentsRepository;
    }

    @Override
    public ResponseEntity<List<Assignment>> execute(Void input) {
        List<Assignment> atividades = assignmentsRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(atividades);
    }
}
