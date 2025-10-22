package com.example.AVA.curso.services;

import com.example.AVA.Query;
import com.example.AVA.curso.CursoRepository;
import com.example.AVA.curso.model.Curso;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetCursoId implements Query<Integer, Curso> {
    private final CursoRepository cursoRepository;

    public GetCursoId(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @Override
    public ResponseEntity<Curso> execute(Integer input) {
        Optional<Curso> cursoOptional = cursoRepository.findById(input);

        if (cursoOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(cursoOptional.get());
        }
        throw new RuntimeException("Curso não encontrado");
    }
}
