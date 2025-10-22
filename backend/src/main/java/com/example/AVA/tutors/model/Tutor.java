package com.example.AVA.tutors.model;

import jakarta.persistence.*;
import lombok.Data;

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
}
