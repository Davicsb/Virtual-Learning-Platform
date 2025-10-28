package com.example.AVA.alunos;

import com.example.AVA.alunos.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlunosRepository extends JpaRepository<Aluno, Integer> {
    Optional<Aluno> findByUserId(Integer integer);
}
