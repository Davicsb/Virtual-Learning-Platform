package com.example.AVA.material.services;

import com.example.AVA.Query;
import com.example.AVA.material.MaterialRepository;
import com.example.AVA.material.model.Material;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetMaterialId implements Query<Integer, Material> {

    private final MaterialRepository materialRepository;

    public GetMaterialId(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @Override
    public ResponseEntity<Material> execute(Integer input) {
        Optional<Material> materialOptional = materialRepository.findById(input);
        if (materialOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(materialOptional.get());
        }
        throw new RuntimeException("Material não encontrado");
    }
}
