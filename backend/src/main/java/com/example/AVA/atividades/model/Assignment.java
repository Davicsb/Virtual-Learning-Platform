package com.example.AVA.atividades.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Assignment")
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
    private Integer maxPoints;

    @Column(name = "ClassId")
    private String classId;
}
