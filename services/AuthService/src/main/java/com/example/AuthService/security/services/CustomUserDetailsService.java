package com.example.AuthService.security.services;
import com.example.AuthService.model.CustomUser;
import com.example.AuthService.model.CustomUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final CustomUserRepository customUserRepository;

    public CustomUserDetailsService(CustomUserRepository customUserRepository) {
        this.customUserRepository = customUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<CustomUser> optionalUser = customUserRepository.findByEmail(email);

        if(optionalUser.isPresent()){
            return User.withUsername(optionalUser.get().getEmail())
                    .password(optionalUser.get().getPassword())
                    .roles(String.valueOf(optionalUser.get().getUserType())).build();
        }

        throw new RuntimeException("User not found");
    }
}
