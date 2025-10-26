package com.example.AVA.alunos.services;

import com.example.AVA.Command;
import com.example.AVA.alunos.AlunosRepository;
import com.example.AVA.alunos.model.Aluno;
import com.example.AVA.alunos.model.UpdateAlunoCommand;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UpdateAluno implements Command<UpdateAlunoCommand, Aluno> {
    private final AlunosRepository alunosRepository;

    public UpdateAluno(AlunosRepository alunosRepository) {
        this.alunosRepository = alunosRepository;
    }

    @Override
    public ResponseEntity<Aluno> execute(UpdateAlunoCommand input) {
        Optional<Aluno> alunoOptional = alunosRepository.findById(input.getId());
        if(alunoOptional.isPresent()) {
            Aluno newAluno = input.getAluno();
            newAluno.setId(input.getId());
            alunosRepository.save(newAluno);
            return ResponseEntity.status(HttpStatus.OK).body(newAluno);
        }
        throw new RuntimeException("Aluno não encontrado");
    }
}
