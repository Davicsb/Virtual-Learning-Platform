package com.example.AVA.alunos;

import com.example.AVA.alunos.model.AlunoAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlunosAssignmentRepository extends JpaRepository<AlunoAssignment, Integer> {
    Optional<AlunoAssignment> findByAlunoIdAndAssignmentId(Integer alunoId, Integer assignmentId);
}
