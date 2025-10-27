package com.example.AVA.material.services;

import com.example.AVA.Command;
import com.example.AVA.material.MaterialRepository;
import com.example.AVA.material.model.Material;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CreateMaterial implements Command<Material, Material> {

    private final MaterialRepository materialRepository;

    public CreateMaterial(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @Override
    public ResponseEntity<Material> execute(Material input) {
        Material savedMaterial = materialRepository.save(input);
        return ResponseEntity.status(HttpStatus.OK).body(savedMaterial);
    }
}
