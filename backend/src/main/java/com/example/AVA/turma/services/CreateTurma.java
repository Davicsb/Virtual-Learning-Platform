package com.example.AVA.turma.services;

import com.example.AVA.Command;
import com.example.AVA.turma.TurmaRepository;
import com.example.AVA.turma.model.Turma;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CreateTurma implements Command<Turma, Turma> {

    private final TurmaRepository turmaRepository;

    public CreateTurma(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    @Override
    public ResponseEntity<Turma> execute(Turma input) {
        Turma savedTurma = turmaRepository.save(input);
        return ResponseEntity.status(HttpStatus.OK).body(savedTurma);
    }
}
