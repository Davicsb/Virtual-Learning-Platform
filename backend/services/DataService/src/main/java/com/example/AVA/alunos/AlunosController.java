package com.example.AVA.alunos;

import com.example.AVA.alunos.model.Aluno;
import com.example.AVA.alunos.model.AlunoAssignment;
import com.example.AVA.alunos.model.SubmitAssignmentCommand;
import com.example.AVA.alunos.model.UpdateAlunoCommand;
import com.example.AVA.alunos.services.*;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/data")
public class AlunosController {
    private final CreateAluno createAluno;
    private final DeleteAluno deleteAluno;
    private final GetAluno getAluno;
    private final GetAlunoId getAlunoId;
    private final UpdateAluno updateAluno;
    private final SubmitAssignment submitAssignment;
    private final GetAlunoByUserId getAlunoByUserId;
    private final GetAlunoAssignments getAlunoAssignments;

    public AlunosController(CreateAluno createAluno, DeleteAluno deleteAluno, GetAluno getAluno, GetAlunoId getAlunoId, UpdateAluno updateAluno, SubmitAssignment submitAssignment, GetAlunoByUserId getAlunoByUserId, GetAlunoAssignments getAlunoAssignments) {
        this.createAluno = createAluno;
        this.deleteAluno = deleteAluno;
        this.getAluno = getAluno;
        this.getAlunoId = getAlunoId;
        this.updateAluno = updateAluno;
        this.submitAssignment = submitAssignment;
        this.getAlunoByUserId = getAlunoByUserId;
        this.getAlunoAssignments = getAlunoAssignments;
    }

    @PostMapping("/aluno")
    public ResponseEntity<Aluno> createAluno(@RequestBody Aluno aluno){
        return createAluno.execute(aluno);
    }

    @GetMapping("/aluno")
    public ResponseEntity<List<Aluno>> getAlunos(){
        return getAluno.execute(null);
    }

    @GetMapping("/aluno/{id}")
    public ResponseEntity<Aluno> getAlunoId(@PathVariable Integer id){
        return getAlunoId.execute(id);
    }

    @GetMapping("/aluno/user-id/{userId}")
    public ResponseEntity<Aluno> getAlunoByUserId(@PathVariable Integer userId) {
        return getAlunoByUserId.execute(userId);
    }

    @GetMapping("/aluno/{alunoId}/atividades")
    public ResponseEntity<List<AlunoAssignment>> getAlunoAssignments(@PathVariable Integer alunoId) {
        return getAlunoAssignments.execute(alunoId);
    }

    @PutMapping("/aluno/{id}")
    public ResponseEntity<Aluno> updateAluno(@PathVariable Integer id, @RequestBody Aluno aluno){
        return updateAluno.execute(new UpdateAlunoCommand(id, aluno));
    }

    @DeleteMapping("/aluno/{id}")
    public ResponseEntity<Void> deleteAluno(@PathVariable Integer id){
        return deleteAluno.execute(id);
    }

    @PutMapping("/aluno/submit")
    public ResponseEntity<AlunoAssignment> submitAssignmnet(@RequestBody SubmitAssignmentCommand submitAssignmentCommand){
        return submitAssignment.execute(submitAssignmentCommand);
    }

}
