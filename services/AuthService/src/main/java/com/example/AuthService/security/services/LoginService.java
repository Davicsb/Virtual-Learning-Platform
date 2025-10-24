package com.example.AuthService.security.services;
import com.example.AuthService.model.CustomUser;
import com.example.AuthService.security.jwt.JwtUtil;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class LoginService {

    private final AuthenticationManager manager;

    public LoginService(AuthenticationManager manager) {
        this.manager = manager;
    }

    public String login(CustomUser user){

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                user.getPassword()
        );
        Authentication authentication = manager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwtToken = JwtUtil.generateToken((User) authentication.getPrincipal());

        return jwtToken;
    }
}
