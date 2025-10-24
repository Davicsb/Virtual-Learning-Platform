package com.example.AVA.atividades.services;

import com.example.AVA.Command;
import com.example.AVA.alunos.AlunosAssignmentRepository;
import com.example.AVA.alunos.model.Aluno;
import com.example.AVA.alunos.model.AlunoAssignment;
import com.example.AVA.atividades.AssignmentsRepository;
import com.example.AVA.atividades.model.Assignment;
import com.example.AVA.turma.TurmaRepository;
import com.example.AVA.turma.model.Turma;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreateAssignment implements Command<Assignment, Assignment> {

    private final AssignmentsRepository assignmentsRepository;
    private final TurmaRepository turmaRepository;
    private final AlunosAssignmentRepository alunosAssignmentRepository;

    public CreateAssignment(AssignmentsRepository assignmentsRepository, TurmaRepository turmaRepository, AlunosAssignmentRepository alunosAssignmentRepository) {
        this.assignmentsRepository = assignmentsRepository;
        this.turmaRepository = turmaRepository;
        this.alunosAssignmentRepository = alunosAssignmentRepository;
    }

    @Override
    public ResponseEntity<Assignment> execute(Assignment input) {
        Optional<Turma> turmaOptional = turmaRepository.findById(input.getTurma().getId());
        if (turmaOptional.isPresent()){
            Assignment savedAssignment = assignmentsRepository.save(input);
            List<Aluno> alunoList = turmaOptional.get().getStudents();
            for(int i = 0; i < alunoList.toArray().length; i++){
                AlunoAssignment alunoAssignment = new AlunoAssignment();
                alunoAssignment.setAlunoId(alunoList.get(i).getId());
                alunoAssignment.setAssignmentId(savedAssignment.getId());
                alunoAssignment.setGrade(0.0);
                alunosAssignmentRepository.save(alunoAssignment);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAssignment);
        }
        throw new RuntimeException("Turma não encontrada");
    }
}
