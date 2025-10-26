package com.example.AVA.tutors.services;

import com.example.AVA.Query;
import com.example.AVA.tutors.TutorsRepository;
import com.example.AVA.tutors.model.Tutor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetTutorId implements Query<Integer, Tutor> {
    private final TutorsRepository tutorsRepository;

    public GetTutorId(TutorsRepository tutorsRepository) {
        this.tutorsRepository = tutorsRepository;
    }

    @Override
    public ResponseEntity<Tutor> execute(Integer input) {
        Optional<Tutor> tutorOptional = tutorsRepository.findById(input);
        if (tutorOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(tutorOptional.get());
        }
        throw new RuntimeException("Professor não encontrado");
    }
}
