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
    private Curso course; //Vários alunos podem pertencer a um curso

    @ManyToMany(mappedBy = "students", cascade = CascadeType.MERGE)
    private List<Turma> turmas;

    @Column(name = "userId")
    private Integer userId;

    @Column(name = "visualização")
    private List<Integer> materiaisVisualizados;

    //@ManyToMany(mappedBy = "alunos", cascade = CascadeType.MERGE)
    //private List<Assignment> atividades;

}
