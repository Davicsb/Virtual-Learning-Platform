package com.example.AVA.alunos.services;

import com.example.AVA.Query;
import com.example.AVA.alunos.AlunosAssignmentRepository;
import com.example.AVA.alunos.AlunosRepository;
import com.example.AVA.alunos.model.AlunoAssignment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetAlunoAssignments implements Query<Integer, List<AlunoAssignment>> {

    private final AlunosRepository alunosRepository;
    private final AlunosAssignmentRepository alunosAssignmentRepository;

    public GetAlunoAssignments(AlunosRepository alunosRepository, AlunosAssignmentRepository alunosAssignmentRepository) {
        this.alunosRepository = alunosRepository;
        this.alunosAssignmentRepository = alunosAssignmentRepository;
    }

    @Override
    public ResponseEntity<List<AlunoAssignment>> execute(Integer input) {
        if(alunosRepository.findById(input).isPresent()) {
            List<AlunoAssignment> entregas = alunosAssignmentRepository.findByAlunoId(alunosRepository.findById(input).get().getId());
            return ResponseEntity.status(HttpStatus.OK).body(entregas);
        }
        throw new RuntimeException("Aluno não encontrado");
    }
}
