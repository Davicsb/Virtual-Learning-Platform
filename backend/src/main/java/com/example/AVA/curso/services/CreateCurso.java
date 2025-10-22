package com.example.AVA.curso.services;

import com.example.AVA.Command;
import com.example.AVA.curso.CursoRepository;
import com.example.AVA.curso.model.Curso;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CreateCurso implements Command<Curso, Curso> {

    private final CursoRepository cursoRepository;

    public CreateCurso(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @Override
    public ResponseEntity<Curso> execute(Curso input) {
        Curso savedCurso = cursoRepository.save(input);
        return ResponseEntity.status(HttpStatus.OK).body(savedCurso);
    }
}
