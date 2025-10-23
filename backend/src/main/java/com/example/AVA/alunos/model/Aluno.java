package com.example.AVA.alunos.model;

import com.example.AVA.curso.model.Curso;
import com.example.AVA.turma.model.Turma;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Aluno")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Aluno {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso course;


    @ManyToMany(mappedBy = "students", cascade = CascadeType.MERGE)
    private List<Turma> turmas;

}
