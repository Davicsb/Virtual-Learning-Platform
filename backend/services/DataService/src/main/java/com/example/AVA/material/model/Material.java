package com.example.AVA.material.model;

import com.example.AVA.turma.model.Turma;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Material")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Material {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Title")
    private String title;

    @Column(name = "Content")
    private String content;

    @Column(name = "Type")
    private String type;

    @Column(name = "urlArquivo")
    private String urlArquivo;

    @Column(name = "Categoria")
    private String categoria;

    @ManyToOne
    @JoinColumn(name = "turma_id")
    private Turma turma; //Vários materiais podem pertencer a uma turma
}
