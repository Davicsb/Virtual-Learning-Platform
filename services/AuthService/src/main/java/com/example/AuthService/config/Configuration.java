package com.example.AuthService.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@org.springframework.context.annotation.Configuration
public class Configuration {

    @Bean
    //Beans get injected into the spring container
    //Gives us access to this template throughout the application
    public RestTemplate restTemplate(){
        //Configure your rest template options
        return new RestTemplate();
    }
}
