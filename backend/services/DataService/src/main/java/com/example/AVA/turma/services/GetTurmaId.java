package com.example.AVA.turma.services;

import com.example.AVA.Query;
import com.example.AVA.turma.TurmaRepository;
import com.example.AVA.turma.model.Turma;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetTurmaId implements Query<Integer, Turma> {

    private final TurmaRepository turmaRepository;

    public GetTurmaId(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    @Override
    public ResponseEntity<Turma> execute(Integer input) {
        Optional<Turma> turmaOptional = turmaRepository.findById(input);

        if (turmaOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(turmaOptional.get());
        }
        throw new RuntimeException("Turma não encontrada");
    }
}
