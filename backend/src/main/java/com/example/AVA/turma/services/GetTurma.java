package com.example.AVA.turma.services;

import com.example.AVA.Query;
import com.example.AVA.turma.TurmaRepository;
import com.example.AVA.turma.model.Turma;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetTurma implements Query<Void, List<Turma>> {

    private final TurmaRepository turmaRepository;

    public GetTurma(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    @Override
    public ResponseEntity<List<Turma>> execute(Void input) {
        List<Turma> turmas = turmaRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(turmas);
    }
}
