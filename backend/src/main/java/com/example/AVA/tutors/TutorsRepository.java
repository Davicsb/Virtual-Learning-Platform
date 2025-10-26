package com.example.AVA.tutors;

import com.example.AVA.tutors.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorsRepository extends JpaRepository<Tutor, Integer> {
}
