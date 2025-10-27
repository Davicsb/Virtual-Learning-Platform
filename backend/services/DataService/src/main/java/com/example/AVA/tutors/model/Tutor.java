package com.example.AVA.tutors.model;

import com.example.AVA.turma.model.Turma;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Tutor")
public class Tutor {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Name")
    private String name;

    @ManyToMany(mappedBy = "tutors", cascade = CascadeType.MERGE)
    private List<Turma> turmas;

    @Column(name = "visualização")
    private List<Integer> materiaisVisualizados;

    @Column(name = "userId")
    private Integer userId;
}
