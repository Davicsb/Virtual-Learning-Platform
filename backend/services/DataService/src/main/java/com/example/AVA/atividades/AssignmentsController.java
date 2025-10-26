package com.example.AVA.atividades;

import com.example.AVA.atividades.model.Assignment;
import com.example.AVA.atividades.model.UpdateAssignmentCommand;
import com.example.AVA.atividades.services.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/data")
public class AssignmentsController {
    private final CreateAssignment createAssignment;
    private final DeleteAssignment deleteAssignment;
    private final GetAssignment getAssignment;
    private final GetAssignmentId getAssignmentId;
    private final UpdateAssignment updateAssignment;

    public AssignmentsController(CreateAssignment createAssignment, DeleteAssignment deleteAssignment, GetAssignment getAssignment, GetAssignmentId getAssignmentId, UpdateAssignment updateAssignment) {
        this.createAssignment = createAssignment;
        this.deleteAssignment = deleteAssignment;
        this.getAssignment = getAssignment;
        this.getAssignmentId = getAssignmentId;
        this.updateAssignment = updateAssignment;
    }

    @PostMapping("/atividades")
    public ResponseEntity<Assignment> createAssignment(@RequestBody Assignment assignment){
        return createAssignment.execute(assignment);
    }

    @GetMapping("/atividades")
    public ResponseEntity<List<Assignment>> getAssignment(){
        return getAssignment.execute(null);
    }

    @GetMapping("/atividades/{id}")
    public ResponseEntity<Assignment> getAssignmentId(@PathVariable Integer id){
        return getAssignmentId.execute(id);
    }

    @PutMapping("/atividades/{id}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable Integer id, @RequestBody Assignment assignment){
        return updateAssignment.execute(new UpdateAssignmentCommand(id, assignment));
    }

    @DeleteMapping("/atividades/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Integer id){
        return deleteAssignment.execute(id);
    }
}
