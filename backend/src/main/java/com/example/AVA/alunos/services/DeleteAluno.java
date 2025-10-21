package com.example.AVA.alunos.services;

import com.example.AVA.Command;
import com.example.AVA.alunos.AlunosRepository;
import com.example.AVA.alunos.model.Aluno;
import jakarta.persistence.Id;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeleteAluno implements Command<Integer, Void> {

    private final AlunosRepository alunosRepository;

    public DeleteAluno(AlunosRepository alunosRepository) {
        this.alunosRepository = alunosRepository;
    }

    @Override
    public ResponseEntity<Void> execute(Integer input) {
        Optional<Aluno> alunoOptional = alunosRepository.findById(input);
        if (alunoOptional.isPresent()) {
            alunosRepository.deleteById(input);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        throw new RuntimeException("Aluno não encontrado");
    }
}
