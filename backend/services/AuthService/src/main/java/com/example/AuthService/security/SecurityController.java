package com.example.AuthService.security;

import com.example.AuthService.model.CustomUser;
import com.example.AuthService.model.LoginServiceCommand;
import com.example.AuthService.model.StudentRequestCommand;
import com.example.AuthService.security.services.CreateAdmin;
import com.example.AuthService.security.services.CreateUserService;
import com.example.AuthService.security.services.LoginService;
import com.example.AuthService.security.services.RegisterUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class SecurityController {
    private final RegisterUserService registerUserService;
    private final LoginService loginService;
    private final CreateUserService createUserService;
    private final CreateAdmin createAdmin;

    public SecurityController(RegisterUserService registerUserService, LoginService loginService, CreateUserService createUserService, CreateAdmin createAdmin) {
        this.registerUserService = registerUserService;
        this.loginService = loginService;
        this.createUserService = createUserService;
        this.createAdmin = createAdmin;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody StudentRequestCommand customUser){
        return registerUserService.register(customUser);
    }

    @PostMapping("/register-admin")
    public ResponseEntity<CustomUser> createAdmin(@RequestBody CustomUser customUser) {
        return createAdmin.createAdmin(customUser);
    }

    @PostMapping("/user")
    public ResponseEntity<Integer> createUser(@RequestBody CustomUser customUser){
        return createUserService.register(customUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CustomUser customUser){
        try {
            LoginServiceCommand response = loginService.login(customUser);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/public")
    public String public_rota(){
        return "rota pública";
    }

    @GetMapping("/private")
    public String private_rota(){
        return "rota privada";
    }
}