package com.example.AVA.alunos.services;

import com.example.AVA.Query;
import com.example.AVA.alunos.AlunosRepository;
import com.example.AVA.alunos.model.Aluno;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetAluno implements Query<Void, List<Aluno>> {
    private final AlunosRepository alunosRepository;

    public GetAluno(AlunosRepository alunosRepository) {
        this.alunosRepository = alunosRepository;
    }

    @Override
    public ResponseEntity<List<Aluno>> execute(Void input) {
        List<Aluno> alunos = alunosRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(alunos);
    }
}
