package com.example.AVA.material.services;

import com.example.AVA.Command;
import com.example.AVA.material.MaterialRepository;
import com.example.AVA.material.model.Material;
import com.example.AVA.material.model.UpdateMaterialCommand;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UpdateMaterial implements Command<UpdateMaterialCommand, Material> {

    private final MaterialRepository materialRepository;

    public UpdateMaterial(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @Override
    public ResponseEntity<Material> execute(UpdateMaterialCommand input) {
        Optional<Material> materialOptional = materialRepository.findById(input.getId());
        if (materialOptional.isPresent()){
            Material newMaterial = input.getMaterial();
            newMaterial.setId(input.getId());
            materialRepository.save(newMaterial);
            return ResponseEntity.status(HttpStatus.OK).body(newMaterial);
        }
        throw new RuntimeException("Material não encontrado");
    }
}
