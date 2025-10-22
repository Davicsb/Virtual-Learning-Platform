package com.example.AVA.tutors;

import com.example.AVA.tutors.model.Tutor;
import com.example.AVA.tutors.model.UpdateTutorCommand;
import com.example.AVA.tutors.services.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TutorsController {
    private final CreateTutor createTutor;
    private final DeleteTutor deleteTutor;
    private final GetTutor getTutor;
    private final GetTutorId getTutorId;
    private final UpdateTutor updateTutor;

    public TutorsController(CreateTutor createTutor, DeleteTutor deleteTutor, GetTutor getTutor, GetTutorId getTutorId, UpdateTutor updateTutor) {
        this.createTutor = createTutor;
        this.deleteTutor = deleteTutor;
        this.getTutor = getTutor;
        this.getTutorId = getTutorId;
        this.updateTutor = updateTutor;
    }

    @PostMapping("/professor")
    public ResponseEntity<Tutor> createTutor(@RequestBody Tutor tutor){
        return createTutor.execute(tutor);
    }

    @GetMapping("/professor")
    public ResponseEntity<List<Tutor>> getTutors(){
        return getTutor.execute(null);
    }

    @GetMapping("/professor/{id}")
    public ResponseEntity<Tutor> getTutorId(@PathVariable Integer id){
        return getTutorId.execute(id);
    }

    @PutMapping("/professor/{id}")
    public ResponseEntity<Tutor> updateTutor(@PathVariable Integer id, @RequestBody Tutor tutor){
        return updateTutor.execute(new UpdateTutorCommand(id, tutor));
    }

    @DeleteMapping("/professor/{id}")
    public ResponseEntity<Void> deleteTutor(@PathVariable Integer id){
        return deleteTutor.execute(id);
    }
}
