package com.example.AVA.security;
import com.example.AVA.security.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfiguration {

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class).build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(){
        return new JwtAuthenticationFilter();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> {
                    //authorize.anyRequest().permitAll();
                    authorize.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                    authorize.requestMatchers(HttpMethod.GET, "data/professor/**").permitAll();
                    authorize.requestMatchers(HttpMethod.GET, "data/aluno/**").permitAll();
                    authorize.requestMatchers(HttpMethod.GET, "/data/curso", "/data/curso/**").permitAll();
                    authorize.requestMatchers(HttpMethod.GET, "data/turma/**").permitAll();
                    authorize.requestMatchers(HttpMethod.GET, "data/atividades/**").permitAll();

                    authorize.requestMatchers(HttpMethod.POST, "data/professor").permitAll();
                    authorize.requestMatchers(HttpMethod.POST, "data/aluno").permitAll();
                    authorize.requestMatchers(HttpMethod.POST, "data/curso").hasRole("ADMIN");
                    authorize.requestMatchers(HttpMethod.POST, "data/turma").hasAnyRole("PROFESSOR", "ADMIN");
                    authorize.requestMatchers(HttpMethod.POST, "data/atividades").hasRole("PROFESSOR");

                    authorize.requestMatchers(HttpMethod.PUT, "data/professor/**").hasAnyRole("PROFESSOR", "ADMIN");
                    authorize.requestMatchers(HttpMethod.PUT, "data/aluno/**").hasAnyRole("ALUNO", "ADMIN");
                    authorize.requestMatchers(HttpMethod.PUT, "data/curso/**").hasAnyRole("ADMIN");
                    authorize.requestMatchers(HttpMethod.PUT, "data/turma/**").hasAnyRole("PROFESSOR", "ADMIN");
                    authorize.requestMatchers(HttpMethod.PUT, "data/professor/**").hasAnyRole("PROFESSOR", "ADMIN");

                    authorize.requestMatchers("/data/professor/grade").hasRole("PROFESSOR");
                    authorize.requestMatchers("/aluno/submit").hasRole("ALUNO");
                    authorize.anyRequest().authenticated();

                })
                .cors(Customizer.withDefaults())
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
