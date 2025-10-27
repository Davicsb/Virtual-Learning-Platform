package com.example.AVA.material.services;

import com.example.AVA.Command;
import com.example.AVA.material.MaterialRepository;
import com.example.AVA.material.model.Material;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeleteMaterial implements Command<Integer, Void> {

    private final MaterialRepository materialRepository;

    public DeleteMaterial(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @Override
    public ResponseEntity<Void> execute(Integer input) {
        Optional<Material> materialOptional = materialRepository.findById(input);
        if (materialOptional.isPresent()){
            materialRepository.deleteById(input);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        throw new RuntimeException("Material não encontrado");
    }
}
