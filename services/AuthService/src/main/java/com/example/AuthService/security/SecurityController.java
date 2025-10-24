package com.example.AuthService.security;

import com.example.AuthService.model.CustomUser;
import com.example.AuthService.model.IdAbstraction;
import com.example.AuthService.model.StudentRequestCommand;
import com.example.AuthService.security.services.CreateUserService;
import com.example.AuthService.security.services.LoginService;
import com.example.AuthService.security.services.RegisterUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityController {
    private final RegisterUserService registerUserService;
    private final LoginService loginService;
    private final CreateUserService createUserService;

    public SecurityController(RegisterUserService registerUserService, LoginService loginService, CreateUserService createUserService) {
        this.registerUserService = registerUserService;
        this.loginService = loginService;
        this.createUserService = createUserService;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<CustomUser> registerUser(@RequestBody StudentRequestCommand customUser){
        return registerUserService.register(customUser);
    }

    @PostMapping("/auth/user")
    public ResponseEntity<Integer> createUser(@RequestBody CustomUser customUser){
        return createUserService.register(customUser);
    }

    @PostMapping("/login")
    public String login(@RequestBody CustomUser customUser){
        return loginService.login(customUser);
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
