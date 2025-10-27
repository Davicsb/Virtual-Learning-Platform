package com.example.AVA.material.services;

import com.example.AVA.Query;
import com.example.AVA.material.MaterialRepository;
import com.example.AVA.material.model.Material;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetMaterial implements Query<Void, List<Material>> {

    private final MaterialRepository materialRepository;

    public GetMaterial(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @Override
    public ResponseEntity<List<Material>> execute(Void input) {
        List<Material> materialList = materialRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(materialList);
    }
}
