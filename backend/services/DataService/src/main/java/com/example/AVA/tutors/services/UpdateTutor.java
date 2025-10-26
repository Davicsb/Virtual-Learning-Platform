package com.example.AVA.tutors.services;

import com.example.AVA.Command;
import com.example.AVA.tutors.TutorsRepository;
import com.example.AVA.tutors.model.Tutor;
import com.example.AVA.tutors.model.UpdateTutorCommand;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UpdateTutor implements Command<UpdateTutorCommand, Tutor> {
    private final TutorsRepository tutorsRepository;

    public UpdateTutor(TutorsRepository tutorsRepository) {
        this.tutorsRepository = tutorsRepository;
    }

    @Override
    public ResponseEntity<Tutor> execute(UpdateTutorCommand input) {
        Optional<Tutor> tutorOptional = tutorsRepository.findById(input.getId());
        if(tutorOptional.isPresent()) {
            Tutor newTutor = input.getTutor();
            newTutor.setId(input.getId());
            tutorsRepository.save(newTutor);
            return ResponseEntity.status(HttpStatus.OK).body(newTutor);
        }
        throw new RuntimeException("Professor não encontrado");
    }
}
