package com.example.AuthService.security.services;

import com.example.AuthService.model.CustomUser;
import com.example.AuthService.model.CustomUserRepository;
import com.example.AuthService.model.LoginServiceCommand;
import com.example.AuthService.security.jwt.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    private final AuthenticationManager manager;
    private final CustomUserRepository customUserRepository;

    public LoginService(AuthenticationManager manager, CustomUserRepository customUserRepository) {
        this.manager = manager;
        this.customUserRepository = customUserRepository;
    }

    public LoginServiceCommand login(CustomUser user){

        Optional<CustomUser> userOptional = customUserRepository.findByEmail(user.getEmail());

        if (userOptional.isPresent()){
            CustomUser existingUser = userOptional.get();
            user.setUserType(existingUser.getUserType());
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                    user.getEmail(),
                    user.getPassword()
            );
            Authentication authentication = manager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwtToken = JwtUtil.generateToken(user);

            return new LoginServiceCommand(jwtToken, existingUser);

        }

        throw new RuntimeException("Email não cadastrado");
    }
}