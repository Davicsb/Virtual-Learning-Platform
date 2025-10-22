package com.example.AVA.tutors.services;

import com.example.AVA.Command;
import com.example.AVA.alunos.model.Aluno;
import com.example.AVA.tutors.TutorsRepository;
import com.example.AVA.tutors.model.Tutor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeleteTutor implements Command<Integer, Void> {
    private final TutorsRepository tutorsRepository;

    public DeleteTutor(TutorsRepository tutorsRepository) {
        this.tutorsRepository = tutorsRepository;
    }

    @Override
    public ResponseEntity<Void> execute(Integer input) {
        Optional<Tutor> tutorOptional = tutorsRepository.findById(input);
        if (tutorOptional.isPresent()) {
            tutorsRepository.deleteById(input);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        throw new RuntimeException("Professor não encontrado");
    }
}
