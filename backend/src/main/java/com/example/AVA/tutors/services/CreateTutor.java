package com.example.AVA.tutors.services;

import com.example.AVA.Command;
import com.example.AVA.tutors.TutorsRepository;
import com.example.AVA.tutors.model.Tutor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CreateTutor implements Command<Tutor, Tutor> {

    private final TutorsRepository tutorsRepository;

    public CreateTutor(TutorsRepository tutorsRepository) {
        this.tutorsRepository = tutorsRepository;
    }

    @Override
    public ResponseEntity<Tutor> execute(Tutor input) {
        Tutor savedTutor = tutorsRepository.save(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTutor);
    }
}
