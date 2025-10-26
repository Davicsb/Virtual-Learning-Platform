package com.example.AuthService.security.services;

import com.example.AuthService.model.CustomUser;
import com.example.AuthService.model.CustomUserRepository;
import com.example.AuthService.model.StudentPayload;
import com.example.AuthService.model.StudentRequestCommand;
import com.example.AuthService.util.UserType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class RegisterUserService {

    private final CustomUserRepository customUserRepository;
    private final PasswordEncoder encoder;
    private final RestTemplate restTemplate;

    public RegisterUserService(CustomUserRepository customUserRepository, PasswordEncoder encoder, RestTemplate restTemplate) {
        this.customUserRepository = customUserRepository;
        this.encoder = encoder;
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<CustomUser> register(StudentRequestCommand user){

        Optional<CustomUser> optionalUser = customUserRepository.findByEmail(user.getEmail());
        if (!optionalUser.isPresent()) {
            CustomUser customUser = new CustomUser();
            customUser.setEmail(user.getEmail());
            customUser.setUserType(UserType.ALUNO);

            customUser.setPassword(encoder.encode(user.getPassword()));
            CustomUser savedCustomUser = customUserRepository.save(customUser);

            StudentPayload studentPayload = new StudentPayload();
            studentPayload.setName(user.getName());
            studentPayload.setTurmas(user.getTurmas());
            studentPayload.setCourse(user.getCourse());
            studentPayload.setUserId(savedCustomUser.getId());

            restTemplate.postForObject("http://localhost:8080/data/aluno", studentPayload, Void.class);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomUser);
        }

        throw new RuntimeException("Email já cadastrado");
    }
}
