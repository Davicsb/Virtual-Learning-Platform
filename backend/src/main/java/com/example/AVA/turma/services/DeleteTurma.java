package com.example.AVA.turma.services;

import com.example.AVA.Command;
import com.example.AVA.turma.TurmaRepository;
import com.example.AVA.turma.model.Turma;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeleteTurma implements Command<Integer, Void> {

    private final TurmaRepository turmaRepository;

    public DeleteTurma(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    @Override
    public ResponseEntity<Void> execute(Integer input) {
        Optional<Turma> turmaOptional = turmaRepository.findById(input);
        if (turmaOptional.isPresent()){
            turmaRepository.deleteById(input);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        throw new RuntimeException("Turma não encontrada");
    }
}
