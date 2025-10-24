package com.example.AVA.atividades.model;

import com.example.AVA.alunos.model.Aluno;
import com.example.AVA.turma.model.Turma;
import com.example.AVA.tutors.model.Tutor;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Assignment")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Assignment {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Title")
    private String title;

    @Column(name = "Content")
    private String content;

    @Column(name = "DueDate")
    private String dueDate;

    @Column(name = "MaxPoints")
    private Double maxPoints;

    @ManyToOne
    @JoinColumn(name = "turma_id")
    private Turma turma; //Várias atividades podem pertencer a uma turma

    //@ManyToMany(mappedBy = "atividades", cascade = CascadeType.MERGE)
    //private List<Aluno> alunos; //Vários alunos podem pertencer a várias atividades

    @ManyToOne
    @JoinColumn(name = "tutor_id")
    private Tutor tutor; //Várias atividades podem pertencer a um professor
}
