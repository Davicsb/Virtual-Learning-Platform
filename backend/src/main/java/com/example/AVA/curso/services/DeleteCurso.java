package com.example.AVA.curso.services;

import com.example.AVA.Command;
import com.example.AVA.curso.CursoRepository;
import com.example.AVA.curso.model.Curso;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeleteCurso implements Command<Integer, Void> {

    private final CursoRepository cursoRepository;

    public DeleteCurso(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @Override
    public ResponseEntity<Void> execute(Integer input) {
        Optional<Curso> cursoOptional = cursoRepository.findById(input);
        if (cursoOptional.isPresent()) {
            cursoRepository.deleteById(input);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        throw new RuntimeException("Curso não encontrado");
    }
}
