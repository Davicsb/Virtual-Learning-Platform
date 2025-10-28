package com.example.AVA.tutors.services;

import com.example.AVA.Query;
import com.example.AVA.tutors.TutorsRepository;
import com.example.AVA.tutors.model.Tutor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetTutorByUserId implements Query<Integer, Tutor> {
    private final TutorsRepository tutorsRepository;

    public GetTutorByUserId(TutorsRepository tutorsRepository) {
        this.tutorsRepository = tutorsRepository;
    }

    @Override
    public ResponseEntity<Tutor> execute(Integer input) {
        Optional<Tutor> optionalTutor = tutorsRepository.findTutorByUserId(input);
        if (optionalTutor.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(optionalTutor.get());
        }
        throw new RuntimeException("Tutor não encontrado");
    }
}
