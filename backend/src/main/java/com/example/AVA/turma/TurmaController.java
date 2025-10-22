package com.example.AVA.turma;

import com.example.AVA.turma.model.Turma;
import com.example.AVA.turma.model.UpdateTurmaCommand;
import com.example.AVA.turma.services.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TurmaController {
    private final CreateTurma createTurma;
    private final DeleteTurma deleteTurma;
    private final GetTurma getTurma;
    private final GetTurmaId getTurmaId;
    private final UpdateTurma updateTurma;

    public TurmaController(CreateTurma createTurma, DeleteTurma deleteTurma, GetTurma getTurma, GetTurmaId getTurmaId, UpdateTurma updateTurma) {
        this.createTurma = createTurma;
        this.deleteTurma = deleteTurma;
        this.getTurma = getTurma;
        this.getTurmaId = getTurmaId;
        this.updateTurma = updateTurma;
    }

    @PostMapping("/turma")
    public ResponseEntity<Turma> createTurma(@RequestBody Turma turma){
        return createTurma.execute(turma);
    }

    @GetMapping("/turma")
    public ResponseEntity<List<Turma>> getTurma(){
        return getTurma.execute(null);
    }

    @GetMapping("/turma/{id}")
    public ResponseEntity<Turma> getTurmaId(@PathVariable Integer id){
        return getTurmaId.execute(id);
    }

    @PutMapping("/turma/{id}")
    public ResponseEntity<Turma> updateTurma(@PathVariable Integer id, @RequestBody Turma turma){
        return updateTurma.execute(new UpdateTurmaCommand(id, turma));
    }

    public ResponseEntity<Void> deleteTurma(@PathVariable Integer id){
        return deleteTurma.execute(id);
    }
}
