package com.example.AVA.turma.services;

import com.example.AVA.Command;
import com.example.AVA.turma.TurmaRepository;
import com.example.AVA.turma.model.Turma;
import com.example.AVA.turma.model.UpdateTurmaCommand;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UpdateTurma implements Command<UpdateTurmaCommand, Turma> {

    private final TurmaRepository turmaRepository;

    public UpdateTurma(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    @Override
    public ResponseEntity<Turma> execute(UpdateTurmaCommand input) {
        Optional<Turma> turmaOptional = turmaRepository.findById(input.getId());

        if (turmaOptional.isPresent()){
            Turma newTurma = input.getTurma();
            newTurma.setId(input.getId());
            turmaRepository.save(newTurma);
            return ResponseEntity.status(HttpStatus.OK).body(newTurma);
        }
        throw new RuntimeException("Turma não encontrada");
    }
}
