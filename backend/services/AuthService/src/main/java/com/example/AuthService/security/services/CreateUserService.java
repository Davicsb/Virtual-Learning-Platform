package com.example.AuthService.security.services;

import com.example.AuthService.model.CustomUser;
import com.example.AuthService.model.CustomUserRepository;
import com.example.AuthService.model.IdAbstraction;
import com.example.AuthService.util.UserType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class CreateUserService {

    private final CustomUserRepository customUserRepository;
    private final PasswordEncoder encoder;


    public CreateUserService(CustomUserRepository customUserRepository, PasswordEncoder encoder, RestTemplate restTemplate) {
        this.customUserRepository = customUserRepository;
        this.encoder = encoder;
    }

    public ResponseEntity<Integer> register(CustomUser user){

        Optional<CustomUser> optionalUser = customUserRepository.findByEmail(user.getEmail());
        if (!optionalUser.isPresent()) {
            CustomUser customUser = new CustomUser();
            customUser.setEmail(user.getEmail());
            customUser.setUserType(UserType.PROFESSOR);

            customUser.setPassword(encoder.encode(user.getPassword()));
            CustomUser savedCustomUser = customUserRepository.save(customUser);

            IdAbstraction idAbstraction = new IdAbstraction();
            idAbstraction.setId(savedCustomUser.getId());

            return ResponseEntity.status(HttpStatus.CREATED).body(idAbstraction.getId());
        }

        throw new RuntimeException("Email já cadastrado");
    }
}

