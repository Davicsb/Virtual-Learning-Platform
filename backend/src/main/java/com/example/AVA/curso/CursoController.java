package com.example.AVA.curso;

import com.example.AVA.alunos.model.Aluno;
import com.example.AVA.alunos.model.UpdateAlunoCommand;
import com.example.AVA.curso.model.Curso;
import com.example.AVA.curso.model.UpdateCursoCommand;
import com.example.AVA.curso.services.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CursoController {
    private final CreateCurso createCurso;
    private final DeleteCurso deleteCurso;
    private final GetCurso getCurso;
    private final GetCursoId getCursoId;
    private final UpdateCurso updateCurso;

    public CursoController(CreateCurso createCurso, DeleteCurso deleteCurso, GetCurso getCurso, GetCursoId getCursoId, UpdateCurso updateCurso) {
        this.createCurso = createCurso;
        this.deleteCurso = deleteCurso;
        this.getCurso = getCurso;
        this.getCursoId = getCursoId;
        this.updateCurso = updateCurso;
    }

    @PostMapping("/curso")
    public ResponseEntity<Curso> createCurso(@RequestBody Curso curso){
        return createCurso.execute(curso);
    }

    @GetMapping("/curso")
    public ResponseEntity<List<Curso>> getCursos(){
        return getCurso.execute(null);
    }

    @GetMapping("/curso/{id}")
    public ResponseEntity<Curso> getCursoId(@PathVariable Integer id){
        return getCursoId.execute(id);
    }

    @PutMapping("/curso/{id}")
    public ResponseEntity<Curso> updateCurso(@PathVariable Integer id, @RequestBody Curso curso){
        return updateCurso.execute(new UpdateCursoCommand(id, curso));
    }

    @DeleteMapping("/curso/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable Integer id){
        return deleteCurso.execute(id);
    }
}
