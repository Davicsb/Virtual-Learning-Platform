package com.example.AVA.alunos.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Entity
@Table(name = "Aluno_Assignment")
public class AlunoAssignment {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Aluno_id")
    private Integer alunoId;

    @Column(name = "Assignment_Id")
    private Integer assignmentId;

    @Column(name = "Arquivos_entrega")
    private List<String> arquivos;

    @Column(name = "Grade")
    private Double grade;

    @Column(name = "Submitted")
    private boolean submitted = false;

}
