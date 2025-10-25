package com.example.AVA.tutors.services;

import com.example.AVA.Command;
import com.example.AVA.tutors.CustomUserRepository;
import com.example.AVA.tutors.TutorsRepository;
import com.example.AVA.tutors.model.CustomUser;
import com.example.AVA.tutors.model.Tutor;
import com.example.AVA.tutors.model.UserPayload;
import com.example.AVA.tutors.model.UserTutorCommand;
import org.apache.catalina.User;
import org.springframework.core.annotation.MergedAnnotation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class CreateTutor implements Command<UserTutorCommand, Tutor> {

    private final TutorsRepository tutorsRepository;
    private final RestTemplate restTemplate;
    private final CustomUserRepository customUserRepository;

    public CreateTutor(TutorsRepository tutorsRepository, RestTemplate restTemplate, CustomUserRepository customUserRepository) {
        this.tutorsRepository = tutorsRepository;
        this.restTemplate = restTemplate;
        this.customUserRepository = customUserRepository;
    }

    @Override
    public ResponseEntity<Tutor> execute(UserTutorCommand input) {

        Optional<CustomUser> optionalUserPayload = customUserRepository.findByEmail(input.getEmail());
        if(!optionalUserPayload.isPresent()){
            UserPayload userPayload = new UserPayload();
            userPayload.setEmail(input.getEmail());
            userPayload.setPassword(input.getPassword());

            ResponseEntity<String> savedUser = restTemplate
                    .postForEntity("http://localhost:8080/auth/user", userPayload, String.class);
            System.out.println(Integer.parseInt(savedUser.getBody()));

            Tutor tutor = new Tutor();
            tutor.setName(input.getName());
            tutor.setTurmas(input.getTurmas());

            tutor.setUserId(Integer.parseInt(savedUser.getBody()));
            Tutor savedTutor = tutorsRepository.save(tutor);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTutor);
        }
        throw new RuntimeException("Email já cadastrado");
    }
}
