package com.example.AVA.alunos.services;

import com.example.AVA.Command;
import com.example.AVA.alunos.AlunosAssignmentRepository;
import com.example.AVA.alunos.AlunosRepository;
import com.example.AVA.alunos.model.Aluno;
import com.example.AVA.alunos.model.AlunoAssignment;
import com.example.AVA.alunos.model.SubmitAssignmentCommand;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubmitAssignment implements Command<SubmitAssignmentCommand, AlunoAssignment> {
    private final AlunosAssignmentRepository alunosAssignmentRepository;

    public SubmitAssignment(AlunosRepository alunosRepository, AlunosAssignmentRepository alunosAssignmentRepository) {
        this.alunosAssignmentRepository = alunosAssignmentRepository;
    }

    @Override
    public ResponseEntity<AlunoAssignment> execute(SubmitAssignmentCommand input) {
        Optional<AlunoAssignment> alunoAssignmentOptional = alunosAssignmentRepository
                .findByAlunoIdAndAssignmentId(input.getAlunoId(), input.getAtividadeId());

        if (alunoAssignmentOptional.isPresent()){
            AlunoAssignment savedAluno = alunoAssignmentOptional.get();
            savedAluno.setSubmitted(true);
            alunosAssignmentRepository.save(savedAluno);
            return ResponseEntity.status(HttpStatus.OK).body(savedAluno);
        }
        throw new RuntimeException("Aluno inválido");
    }
}
