package com.example.AuthService;

import org.springframework.http.ResponseEntity;

public interface Command<I, O> {
    ResponseEntity<O> execute(I input); //Criando uma estrutura para todas as funções que cadastram dados
    // que recebem o input do tipo I e retornam uma respota do tipo O
}
