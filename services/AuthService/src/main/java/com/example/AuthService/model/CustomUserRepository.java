package com.example.AuthService.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomUserRepository extends JpaRepository<CustomUser, String> {

    Optional<CustomUser> findByEmail(String email);
}
