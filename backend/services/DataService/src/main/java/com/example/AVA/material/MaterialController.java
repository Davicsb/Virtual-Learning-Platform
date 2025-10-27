package com.example.AVA.material;

import com.example.AVA.material.model.Material;
import com.example.AVA.material.model.UpdateMaterialCommand;
import com.example.AVA.material.model.ViewMaterialCommand;
import com.example.AVA.material.services.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.util.List;

@RestController
@RequestMapping("/data")
public class MaterialController {
    private final CreateMaterial createMaterial;
    private final DeleteMaterial deleteMaterial;
    private final GetMaterial getMaterial;
    private final GetMaterialId getMaterialId;
    private final UpdateMaterial updateMaterial;
    private final ViewMaterial viewMaterial;

    public MaterialController(CreateMaterial createMaterial, DeleteMaterial deleteMaterial, GetMaterial getMaterial, GetMaterialId getMaterialId, UpdateMaterial updateMaterial, ViewMaterial viewMaterial) {
        this.createMaterial = createMaterial;
        this.deleteMaterial = deleteMaterial;
        this.getMaterial = getMaterial;
        this.getMaterialId = getMaterialId;
        this.updateMaterial = updateMaterial;
        this.viewMaterial = viewMaterial;
    }

    @PostMapping("/material")
    public ResponseEntity<Material> createMaterial(@RequestBody Material material){
        return createMaterial.execute(material);
    }

    @GetMapping("/material")
    public ResponseEntity<List<Material>> getMaterials(){
        return getMaterial.execute(null);
    }

    @GetMapping("/material/{id}")
    public ResponseEntity<Material> getMaterialId(@PathVariable Integer id){
        return getMaterialId.execute(id);
    }

    @PutMapping("/material/{id}")
    public ResponseEntity<Material> updateMaterial(@PathVariable Integer id, @RequestBody Material material){
        return updateMaterial.execute(new UpdateMaterialCommand(id, material));
    }

    @DeleteMapping("/material/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Integer id){
        return deleteMaterial.execute(id);
    }

    @GetMapping("/material/{id}/view")
    public ResponseEntity<Resource> viewMaterial(@PathVariable Integer alunoId, @PathVariable Integer id){
        return viewMaterial.execute(new ViewMaterialCommand(alunoId, id));
    }
}

