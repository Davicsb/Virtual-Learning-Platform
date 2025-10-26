package com.example.AVA.curso.services;

import com.example.AVA.Query;
import com.example.AVA.curso.CursoRepository;
import com.example.AVA.curso.model.Curso;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetCurso implements Query<Void, List<Curso>> {

    private final CursoRepository cursoRepository;

    public GetCurso(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @Override
    public ResponseEntity<List<Curso>> execute(Void input) {
        List<Curso> cursos = cursoRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(cursos);
    }
}
