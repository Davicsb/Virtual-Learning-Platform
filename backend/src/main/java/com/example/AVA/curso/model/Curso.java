package com.example.AVA.curso.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Curso")
public class Curso {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Title")
    private String title;

    @Column(name = "Content")
    private String content;
}
