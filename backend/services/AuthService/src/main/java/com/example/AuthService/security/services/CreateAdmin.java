package com.example.AuthService.security.services;

import com.example.AuthService.model.CustomUser;
import com.example.AuthService.model.CustomUserRepository;
import com.example.AuthService.util.UserType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class CreateAdmin {

    private final CustomUserRepository customUserRepository;
    private final PasswordEncoder encoder;
    private final RestTemplate restTemplate;

    public CreateAdmin(CustomUserRepository customUserRepository, PasswordEncoder encoder, RestTemplate restTemplate) {
        this.customUserRepository = customUserRepository;
        this.encoder = encoder;
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<CustomUser> createAdmin(CustomUser customUser){

        Optional<CustomUser> optionalUser = customUserRepository.findByEmail(customUser.getEmail());
        if (!optionalUser.isPresent()){
            CustomUser newUser = new CustomUser();
            newUser.setEmail(customUser.getEmail());
            newUser.setUserType(UserType.ADMIN);

            newUser.setPassword(encoder.encode(customUser.getPassword()));
            CustomUser savedCustomUser = customUserRepository.save(newUser);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomUser);
        }
        throw new RuntimeException("Email já cadastrado");
    }
}
