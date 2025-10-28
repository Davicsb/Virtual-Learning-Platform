package com.example.AVA.alunos.services;

import com.example.AVA.Query;
import com.example.AVA.alunos.AlunosRepository;
import com.example.AVA.alunos.model.Aluno;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetAlunoByUserId implements Query<Integer, Aluno> {

    private final AlunosRepository alunosRepository;

    public GetAlunoByUserId(AlunosRepository alunosRepository) {
        this.alunosRepository = alunosRepository;
    }

    @Override
    public ResponseEntity<Aluno> execute(Integer input) {
        Optional<Aluno> alunoOptional = alunosRepository.findByUserId(input);
        if (alunoOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(alunoOptional.get());
        }
        throw new RuntimeException("Aluno não encontrado");
    }
}

