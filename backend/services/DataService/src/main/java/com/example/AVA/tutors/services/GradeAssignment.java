package com.example.AVA.tutors.services;

import com.example.AVA.Command;
import com.example.AVA.alunos.AlunosAssignmentRepository;
import com.example.AVA.alunos.AlunosRepository;
import com.example.AVA.alunos.model.AlunoAssignment;
import com.example.AVA.atividades.AssignmentsRepository;
import com.example.AVA.tutors.model.GradeAssignmentCommand;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GradeAssignment implements Command<GradeAssignmentCommand, AlunoAssignment> {

    private final AssignmentsRepository assignmentsRepository;
    private final AlunosRepository alunosRepository;
    private final AlunosAssignmentRepository alunosAssignmentRepository;

    public GradeAssignment(AssignmentsRepository assignmentsRepository, AlunosRepository alunosRepository, AlunosAssignmentRepository alunosAssignmentRepository) {
        this.assignmentsRepository = assignmentsRepository;
        this.alunosRepository = alunosRepository;
        this.alunosAssignmentRepository = alunosAssignmentRepository;
    }

    @Override
    public ResponseEntity<AlunoAssignment> execute(GradeAssignmentCommand input) {
        Optional<AlunoAssignment> alunoAssignmentOptional = alunosAssignmentRepository
                .findByAlunoIdAndAssignmentId(input.getAlunoId(), input.getAtividadeId());

        if (alunoAssignmentOptional.isPresent()) {
            AlunoAssignment alunoAssignment = alunoAssignmentOptional.get();
            alunoAssignment.setGrade(input.getGrade());
            AlunoAssignment savedAlunoAssignment = alunosAssignmentRepository.save(alunoAssignment);
            return ResponseEntity.ok().body(savedAlunoAssignment);
        }
        throw new RuntimeException("Esse aluno não tem essa atividade.");
    }
}
