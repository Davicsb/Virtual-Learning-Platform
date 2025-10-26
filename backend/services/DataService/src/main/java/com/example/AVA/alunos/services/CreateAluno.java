package com.example.AVA.alunos.services;

import com.example.AVA.Command;
import com.example.AVA.alunos.AlunosRepository;
import com.example.AVA.alunos.model.Aluno;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CreateAluno implements Command<Aluno, Aluno> {

    private final AlunosRepository alunosRepository;

    public CreateAluno(AlunosRepository alunosRepository) {
        this.alunosRepository = alunosRepository;
    }

    @Override
    public ResponseEntity<Aluno> execute(Aluno input) {
        Aluno savedAluno = alunosRepository.save(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAluno);
    }
}
