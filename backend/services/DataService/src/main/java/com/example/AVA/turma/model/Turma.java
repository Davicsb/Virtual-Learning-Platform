package com.example.AVA.turma.model;

import com.example.AVA.alunos.model.Aluno;
import com.example.AVA.curso.model.Curso;
import com.example.AVA.tutors.model.Tutor;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Turma")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Turma {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Title")
    private String title;

    @Column(name = "Content")
    private String content;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "curso_id")
    private Curso course;

    @ManyToMany
    @JoinTable(name = "Turma_Professor",
            joinColumns = @JoinColumn(name = "turma_id"),
            inverseJoinColumns = @JoinColumn(name = "tutor_id"))
    private List<Tutor> tutors;

    @ManyToMany
    @JoinTable(
            name = "Turma_Aluno",
            joinColumns = @JoinColumn(name = "turma_id"),
            inverseJoinColumns = @JoinColumn(name = "aluno_id")
    )
    private List<Aluno> students;

}
