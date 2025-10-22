package com.example.AVA.curso.services;

import com.example.AVA.Command;
import com.example.AVA.curso.CursoRepository;
import com.example.AVA.curso.model.Curso;
import com.example.AVA.curso.model.UpdateCursoCommand;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UpdateCurso implements Command<UpdateCursoCommand, Curso> {

    private final CursoRepository cursoRepository;

    public UpdateCurso(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @Override
    public ResponseEntity<Curso> execute(UpdateCursoCommand input) {
        Optional<Curso> cursoOptional = cursoRepository.findById(input.getId());
        if (cursoOptional.isPresent()) {
            Curso newCurso = input.getCurso();
            newCurso.setId(input.getId());
            cursoRepository.save(newCurso);
            return ResponseEntity.status(HttpStatus.OK).body(newCurso);
        }
        throw new RuntimeException("Curso não encontrado");
    }
}
