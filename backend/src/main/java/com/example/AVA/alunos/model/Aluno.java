package com.example.AVA.alunos.model;

import com.example.AVA.util.UserType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Aluno")
public class Aluno {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Username")
    private String userName;

    @Column(name = "Email")
    private String userEmail;

    @Column(name = "Password")
    private String userPassword;

    @Enumerated(EnumType.STRING)
    @Column(name = "Usertype")
    private UserType userType; // tipo do usuário

    @Column(name = "Course")
    private String course;

}
