package com.example.AVA.atividades;

import com.example.AVA.atividades.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentsRepository extends JpaRepository<Assignment, Integer> {
}
