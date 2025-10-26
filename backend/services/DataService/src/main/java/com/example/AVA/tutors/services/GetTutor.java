package com.example.AVA.tutors.services;

import com.example.AVA.Query;
import com.example.AVA.tutors.TutorsRepository;
import com.example.AVA.tutors.model.Tutor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetTutor implements Query<Void, List<Tutor>> {
    private final TutorsRepository tutorsRepository;

    public GetTutor(TutorsRepository tutorsRepository) {
        this.tutorsRepository = tutorsRepository;
    }

    @Override
    public ResponseEntity<List<Tutor>> execute(Void input) {
        List<Tutor> tutors = tutorsRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(tutors);
    }
}
