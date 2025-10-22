package com.example.AVA.turma.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Turma")
public class Turma {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Title")
    private String title;

    @Column(name = "Content")
    private String content;

    @Column(name = "Course")
    private String course;

    @Column(name = "Tutors")
    private Integer[] tutors;

    @Column(name = "Students")
    private Integer[] students;
}
